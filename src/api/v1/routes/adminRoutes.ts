import { Router } from "express";
import { listAllUsers } from "../controller/adminController";

const router = Router();

router.get("/users", listAllUsers);

export default router;
