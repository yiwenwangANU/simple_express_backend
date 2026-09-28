import { Router } from "express";
import { addToWatchlist } from "../controllers/watchlistController";

const router = Router();

router.post("/", addToWatchlist);

export default router;
