import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:maxConcurrency');

export type MaxConcurrencyMethod = (concurrency: number) => Agenda;
/**
 * Set the concurrency for jobs (globally), type does not matter
 * @name Agenda#maxConcurrency
 * @function
 * @param concurrency max concurrency value
 * @returns agenda instance
 */
export const maxConcurrency: MaxConcurrencyMethod = function (this: Agenda, concurrency) {
  debug('Agenda.maxConcurrency(%d)', concurrency);
  this._maxConcurrency = concurrency;
  return this;
};
