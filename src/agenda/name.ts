import createDebugger from 'debug';
import { Agenda } from '.';

const debug = createDebugger('agenda:name');

export type NameMethod = (name: string) => Agenda;
/**
 * Set name of queue
 * @name Agenda#name
 * @function
 * @param name name of agenda instance
 */
export const name: NameMethod = function (this: Agenda, name) {
  debug('Agenda.name(%s)', name);
  this._name = name;
  return this;
};
