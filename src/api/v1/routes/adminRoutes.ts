import { Router } from "express";
import { listAllUsers } from "../controller/adminController";

const router = Router();

router.get("/list-users", listAllUsers);

export default router;
