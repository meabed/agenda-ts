import createDebugger from 'debug';
import { Document, Filter } from 'mongodb';
import { Agenda } from '.';

const debug = createDebugger('agenda:cancel');

export type CancelMethod = (query: Filter<Document>) => Promise<number | undefined>;
/**
 * Cancels any jobs matching the passed MongoDB query, and removes them from the database.
 * @name Agenda#cancel
 * @function
 * @param query MongoDB query to use when cancelling
 * @caller client code, Agenda.purge(), Job.remove()
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cancel: CancelMethod = async function (this: Agenda, query) {
  debug('attempting to cancel all Agenda jobs', query);
  try {
    const { deletedCount } = await this._collection.deleteMany(query);
    this.emit('cancel', deletedCount);

    debug('%s jobs cancelled', deletedCount);
    return deletedCount;
  } catch (error) {
    debug('error trying to delete jobs from MongoDB');
    throw error;
  }
};
