import { Router } from "express";
import { getAllLoans, getLoanById, createLoan, updateLoan, deleteLoan } from "../controller/loanController";

const router = Router();

// Loan endpoints
router.get("/", getAllLoans);
router.get("/:id", getLoanById);
router.post("/", createLoan);
router.put("/:id", updateLoan);
router.delete("/:id", deleteLoan);

export default router;
