import { Job, JobAttributes } from '../job';
import { Agenda } from '../agenda';

/**
 * Create Job object from data
 * @param {Object} agenda instance of Agenda
 * @param {Object} jobData job data
 * @returns {Job} returns created job
 */
export const createJob = (agenda: Agenda, jobData: JobAttributes): Job => {
  jobData.agenda = agenda;
  return new Job(jobData);
};
