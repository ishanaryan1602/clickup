import { Router } from "express";
import { getSample } from "../controllers/sampleController.js";

const router = Router();

router.get("/",getSample);

export const sampleRoute = router;