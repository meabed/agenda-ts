import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:defaultLockLimit');

export type DefaultLockLimitMethod = (times: number) => Agenda;
/**
 * Set default lock limit per job type
 * @name Agenda#defaultLockLimit
 * @function
 * @param {Number} num Lock limit per job
 * @returns {Agenda} agenda instance
 */
export const defaultLockLimit: DefaultLockLimitMethod = function (this: Agenda, times) {
  debug('Agenda.defaultLockLimit(%d)', times);
  this._defaultLockLimit = times;
  return this;
};
