import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Server } from 'http';
import awsServerlessExpress from 'aws-serverless-express';

import app from './app';
import { connectToMongoDb } from './commons';

const server = awsServerlessExpress.createServer(app);

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<Server> => {
  context.callbackWaitsForEmptyEventLoop = false; // Keep the MongoDB connection open between invocations
  await connectToMongoDb(); // Ensure the MongoDB connection is established
  return awsServerlessExpress.proxy(server, event, context);
};
