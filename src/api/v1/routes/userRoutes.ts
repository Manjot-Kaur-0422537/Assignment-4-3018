import { Router } from "express";
import { setCustomClaim, getUserClaims } from "../controller/userController";

const router = Router();

router.post("/set-role", setCustomClaim);
router.get("/claims/:uid", getUserClaims);

export default router;
