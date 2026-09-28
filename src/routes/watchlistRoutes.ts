import { Router } from "express";
import {
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
} from "../controllers/watchlistController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.post("/", authMiddleware, addToWatchlist);
router.put("/", authMiddleware, updateWatchlist);
router.delete("/:id", authMiddleware, removeFromWatchlist);

export default router;
