import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getMovies = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();
};

export { getMovies };
