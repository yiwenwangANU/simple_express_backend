import { config } from "dotenv";
import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoutes";
import movieRoute from "./routes/movieRoutes";
import watchlistRoute from "./routes/watchlistRoutes";
import { connectDB } from "./lib/prisma";

config();
connectDB();

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/movies", movieRoute);
app.use("/watchlist", watchlistRoute);

app.listen(process.env.PORT, () =>
  console.log(`Server listen on Port: ${process.env.PORT}`),
);
