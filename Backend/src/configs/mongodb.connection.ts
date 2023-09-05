import mongoose from 'mongoose';
import envConfig from './env.config';

const { MONGO_URL } = envConfig;
export default async () => {
  mongoose.Promise = Promise;
  await mongoose.connect(MONGO_URL);
  console.log('mongo connected');
  mongoose.connection.on('error', (error: Error) => console.log(error));
};
