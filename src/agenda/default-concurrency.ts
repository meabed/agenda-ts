import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:defaultConcurrency');

export type DefaultConcurrencyMethod = (concurrency: number) => Agenda;
/**
 * Set the default concurrency for each job
 * @name Agenda#defaultConcurrency
 * @function
 * @param concurrency default concurrency
 */
export const defaultConcurrency: DefaultConcurrencyMethod = function (this: Agenda, concurrency) {
  debug('Agenda.defaultConcurrency(%d)', concurrency);
  this._defaultConcurrency = concurrency;
  return this;
};
