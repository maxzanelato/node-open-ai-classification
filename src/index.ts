import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';

dotenv.config();

import routes from './routes';

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log('====================================');
  console.log(`⚡️ Server started on port ${port}! ⚡️`);
  console.log('====================================');
});
