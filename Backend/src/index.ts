import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongodbConnection from './configs/mongodb.connection';
import envConfig from './configs/env.config';
import router from './routes';
import { S3Client } from '@aws-sdk/client-s3';
import errorMiddleware from './middlewares/errors.middleware';

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router());
app.use(errorMiddleware);

mongodbConnection();

app.listen(envConfig.PORT, () => {
  console.log('Server running on http://127.0.0.1:8080/');
});
