import { connectToMongoDb } from '../src/commons';
import mongoose from 'mongoose';

beforeAll(async () => {
  await connectToMongoDb();
});

afterAll(async () => {
  await mongoose.connection.close();
});
