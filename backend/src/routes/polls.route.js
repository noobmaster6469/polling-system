import express from "express";
import {
  showpolls,
  createPoll,
  deletePoll,
  votePoll,
} from "../controllers/polls.controller.js";

const router = express.Router();

router.post("/fetchpolls", showpolls);
router.post("/createpoll", createPoll);
router.delete("/deletepoll/:pollId", deletePoll);

router.post("/votePoll", votePoll);
export default router;
