import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { Server } from 'http';
import awsServerlessExpress from 'aws-serverless-express';

import app from './app';
import { connectToMongoDb } from './commons';

connectToMongoDb();

const server = awsServerlessExpress.createServer(app);

export const handler = (event: APIGatewayProxyEvent, context: Context): Server =>
  awsServerlessExpress.proxy(server, event, context);
