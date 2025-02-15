import express, { Router } from "express";
import handleChat from "../controller/gtp-controller.js";
const router = Router();

router.post("/chat", handleChat);

export default router;