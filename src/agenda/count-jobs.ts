import { CountDocumentsOptions, Filter } from 'mongodb';
import { Agenda } from '.';

export const countJobsRepo = async function (this: Agenda, query = {}, options = {}) {
  return await this._collection.countDocuments(query, options);
};
export type CountJobsMethod = (query?: Filter<any>, options?: CountDocumentsOptions | undefined) => Promise<number>;

/**
 * Counts all jobs matching 'query'
 * @name Agenda#countJobs
 * @function
 * @param [query] object for MongoDB
 * @param [options] object for MongoDB
 * @returns resolves when fails or passes
 */
export const countJobs = async function (this: Agenda, query = {}, options = {}) {
  return await this._collection.countDocuments(query, options);
};
