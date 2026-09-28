import { Router } from "express";
import { addToWatchlist } from "../controllers/watchlistController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, addToWatchlist);

export default router;
