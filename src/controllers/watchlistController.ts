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

const updateWatchlist = async (req: Request<{ id: string }>, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized action." });
  }
  const watchlistItem = await prisma.watchlistItem.findUnique({
    where: {
      id: req.params.id,
    },
  });
  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not exist." });
  }
  if (watchlistItem.userId !== req.user.id) {
    return res.status(403).json({ error: "Unauthorized action." });
  }
  const { status, rating, notes, movieId } = req.body;
  const movie = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });
  if (!movie) {
    return res.status(404).json({ error: "Movie not exist." });
  }
  const updatedWatchlistItem = await prisma.watchlistItem.update({
    where: { id: req.params.id },
    data: {
      status,
      rating,
      notes,
    },
  });
  res.status(200).json({
    status: "Success",
    data: updatedWatchlistItem,
    message: "Watchlist updated successfully.",
  });
};

const removeFromWatchlist = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized action." });
  }
  const watchlistExist = await prisma.watchlistItem.findUnique({
    where: { id: req.params.id },
  });
  if (!watchlistExist) {
    return res.status(404).json({ error: "Watchlist item not exist." });
  }

  if (req.user.id !== watchlistExist.userId) {
    return res.status(403).json({ error: "Unauthorized action." });
  }
  await prisma.watchlistItem.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    status: "Success",
    message: "Movie remove from watchlist successfully.",
  });
};
export { addToWatchlist, updateWatchlist, removeFromWatchlist };
