import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:defaultLockLifetime');

export type DefaultLockLifetimeMethod = (ms: number) => Agenda;

/**
 * Set the default lock time (in ms)
 * Default is 10 * 60 * 1000 ms (10 minutes)
 * @name Agenda#defaultLockLifetime
 * @function
 * @param {Number} ms time in ms to set default lock
 */
export const defaultLockLifetime: DefaultLockLifetimeMethod = function (this: Agenda, ms) {
  debug('Agenda.defaultLockLifetime(%d)', ms);
  this._defaultLockLifetime = ms;
  return this;
};
