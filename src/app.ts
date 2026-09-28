import { config } from "dotenv";
import express, { type Express, type Request, type Response } from "express";
import authRoute from './routes/authRoutes'

config();
const app: Express = express();

app.use(express.json());

app.use('/auth', authRoute)

app.listen(process.env.PORT, () =>
  console.log(`Server listen on Port: ${process.env.PORT}`),
);
