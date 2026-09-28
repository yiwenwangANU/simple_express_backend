import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const addToWatchlist = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized action." });
  }
  const { movieId, status, rating, notes } = req.body;
  const movieExist = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!movieExist) {
    return res.status(404).json({ error: "Movie not exist." });
  }
  const watchlistExist = await prisma.watchlistItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user.id,
        movieId,
      },
    },
  });
  if (watchlistExist) {
    return res.status(400).json({ error: "Watchlist already exist." });
  }
  const watchlist = await prisma.watchlistItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status ?? "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlist,
    },
  });
};

export { addToWatchlist };
