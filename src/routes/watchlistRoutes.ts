import { Router } from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
} from "../controllers/watchlistController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, addToWatchlist);
router.delete("/:id", authMiddleware, removeFromWatchlist);

export default router;
