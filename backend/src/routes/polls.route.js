import express from "express";
import { huhu } from "../controllers/polls.controller.js";

const router = express.Router();

router.get("/", huhu);

export default router;
