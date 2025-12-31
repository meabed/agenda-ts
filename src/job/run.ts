import createDebugger from 'debug';
import { Job } from '.';
import { JobError } from '../utils';

const debug = createDebugger('agenda:job');

export type RunMethod = () => Promise<Job>;
/**
 * Internal method (RUN)
 * @name Job#run
 * @function
 */
export const run: RunMethod = async function (this: Job) {
  const { agenda } = this;
  const definition = agenda._definitions[this.attrs.name];

  return new Promise(async (resolve, reject) => {
    this.attrs.lastRunAt = new Date();

    const previousRunAt = this.attrs.nextRunAt;
    debug('[%s:%s] setting lastRunAt to: %s', this.attrs.name, this.attrs._id, this.attrs.lastRunAt.toISOString());
    this.computeNextRunAt();
    await this.save();

    let finished = false;
    let resumeOnRestartSkipped = false;
    const jobCallback = async (error?: Error, result?: unknown) => {
      // We don't want to complete the job multiple times
      if (finished) {
        return;
      }

      finished = true;

      if (error) {
        this.fail(error);
      } else {
        if (!resumeOnRestartSkipped) {
          this.attrs.lastFinishedAt = new Date();
          this.attrs.finishedCount = (this.attrs.finishedCount || 0) + 1;

          if (this.attrs.shouldSaveResult && result) {
            this.attrs.result = result;
          }
        }
      }

      this.attrs.lockedAt = null;

      await this.save().catch((error: Error) => {
        debug('[%s:%s] failed to be saved to MongoDB', this.attrs.name, this.attrs._id);
        reject(error);
      });
      debug('[%s:%s] was saved successfully to MongoDB', this.attrs.name, this.attrs._id);

      if (error) {
        agenda.emit('fail', error, this);
        agenda.emit('fail:' + this.attrs.name, error, this);
        debug('[%s:%s] has failed [%s]', this.attrs.name, this.attrs._id, error.message);
      } else {
        agenda.emit('success', this);
        agenda.emit('success:' + this.attrs.name, this);
        debug('[%s:%s] has succeeded', this.attrs.name, this.attrs._id);
      }

      agenda.emit('complete', this);
      agenda.emit('complete:' + this.attrs.name, this);
      debug(
        '[%s:%s] job finished at [%s] and was unlocked',
        this.attrs.name,
        this.attrs._id,
        this.attrs.lastFinishedAt
      );
      // Curiously, we still resolve successfully if the job processor failed.
      // Agenda is not equipped to handle errors originating in user code, so, we leave them to inspect the side-effects of job.fail()
      resolve(this);
    };

    try {
      agenda.emit('start', this);
      agenda.emit('start:' + this.attrs.name, this);
      debug('[%s:%s] starting job', this.attrs.name, this.attrs._id);
      if (!definition) {
        debug('[%s:%s] has no definition, can not run', this.attrs.name, this.attrs._id);
        throw new JobError('Undefined job');
      }

      // on restart, skip the job if it's not time to run
      if (
        !this.agenda._resumeOnRestart &&
        previousRunAt &&
        this.agenda._readyAt >= previousRunAt &&
        this.attrs.nextRunAt
      ) {
        debug('[%s:%s] job resumeOnRestart skipped', this.attrs.name, this.attrs._id);
        resumeOnRestartSkipped = true;
        await jobCallback(undefined, 'skipped');
        return;
      }

      this.attrs.runCount = (this.attrs.runCount || 0) + 1;

      if (definition.fn.length === 2) {
        debug('[%s:%s] process function being called', this.attrs.name, this.attrs._id);
        await definition.fn(this, jobCallback);
      } else {
        debug('[%s:%s] process function being called', this.attrs.name, this.attrs._id);
        const result = await definition.fn(this);
        await jobCallback(undefined, result);
      }
    } catch (error) {
      debug('[%s:%s] unknown error occurred', this.attrs.name, this.attrs._id);
      await jobCallback(error as Error);
    }
  });
};
