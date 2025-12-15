import { Router } from "express";
import { helloController } from "../controllers/test.controller.js";

const router = Router();

router.get("/hello",helloController);

export default router;

