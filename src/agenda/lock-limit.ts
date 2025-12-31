import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:locklimit');

export type LockLimitMethod = (limit: number) => Agenda;
/**
 * Set the default amount jobs that are allowed to be locked at one time (GLOBAL)
 * @name Agenda#locklimit
 * @function
 * @param limit num Lock limit
 */
export const lockLimit: LockLimitMethod = function (this: Agenda, limit) {
  // @NOTE: Is this different than max concurrency?
  debug('Agenda.lockLimit(%d)', limit);
  this._lockLimit = limit;
  return this;
};
