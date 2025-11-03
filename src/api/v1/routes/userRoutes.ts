import { Router } from "express";
import { setCustomClaim, getUserClaims } from "../controller/userController";
import { authenticateUser } from "../middleware/authMiddleware";

const router = Router();

router.post("/set-role", authenticateUser, setCustomClaim);
router.get("/claims/:uid", authenticateUser, getUserClaims);

export default router;
