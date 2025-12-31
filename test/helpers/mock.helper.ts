import debug from 'debug';
import { MongoClient } from 'mongodb';

const log = debug('pulse:mock-mongodb');

export interface IMockMongo {
  disconnect: () => Promise<void>;
  mongo: MongoClient;
  uri: string;
}

export async function mockMongoDb(): Promise<IMockMongo> {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/agent-test-db';
  log('Connecting to mock MongoDB instance... %s', uri);
  const mongo = await MongoClient.connect(uri);

  const disconnect = async (): Promise<void> => {
    await mongo.close();
  };

  const self: IMockMongo = {
    disconnect,
    mongo,
    uri,
  };

  return self;
}
