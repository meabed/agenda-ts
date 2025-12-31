import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:sort');

export type SortMethod = (query: any) => Agenda;
/**
 * Set the sort query for finding next job
 * Default is { nextRunAt: 1, priority: -1 }
 * @name Agenda#sort
 * @function
 * @param query sort query object for MongoDB
 */
export const sort: SortMethod = function (this: Agenda, query) {
  debug('Agenda.sort([Object])');
  this._sort = query;
  return this;
};
