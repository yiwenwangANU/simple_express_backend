import { config } from 'dotenv';
import express, { type Express, type Request, type Response } from 'express';

config()
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000);