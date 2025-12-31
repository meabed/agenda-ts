import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:resumeOnRestart');

export type ResumeOnRestartMethod = (resume?: boolean) => Agenda;

/**
 * Set the resume on restart flag
 * @name Agenda#resumeOnRestart
 * @function
 * @param resume resume on restart
 */
export const resumeOnRestart: ResumeOnRestartMethod = function (this: Agenda, resume = true) {
  debug('Agenda.resumeOnRestart()');

  this._resumeOnRestart = resume;

  if (this._collection && this._resumeOnRestart) {
    const now = new Date();
    this._collection
      .updateMany(
        {
          $or: [
            {
              lockedAt: { $exists: true },
              nextRunAt: { $ne: null },
              $or: [{ $expr: { $eq: ['$runCount', '$finishedCount'] } }, { lastFinishedAt: { $exists: false } }],
            },
            {
              lockedAt: { $exists: false },
              lastFinishedAt: { $exists: false },
              nextRunAt: { $lte: now, $ne: null },
            },
          ],
        },
        {
          $unset: { lockedAt: undefined, lastModifiedBy: undefined, lastRunAt: undefined },
          $set: { nextRunAt: now },
        }
      )
      .then((result) => {
        if (result.modifiedCount > 0) {
          debug('resuming unfinished %d jobs(%s)', result.modifiedCount, now.toISOString());
        }
      });
  }

  return this;
};
