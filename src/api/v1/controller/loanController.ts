import { Request, Response } from "express";

// GET all loans
export const getAllLoans = (req: Request, res: Response) => {
  res.status(403).json({
    error: "Access denied. You do not have the required admin role.",
  });
};

// GET loan by ID
export const getLoanById = (req: Request, res: Response) => {
  res.status(403).json({
    error: `Access denied. You do not have permission to view loan ID ${req.params.id}.`,
  });
};

// POST create a new loan
export const createLoan = (req: Request, res: Response) => {
  res.status(403).json({
    error: "Access denied. Only admins can create loans.",
  });
};

// PUT update loan
export const updateLoan = (req: Request, res: Response) => {
  res.status(403).json({
    error: `Access denied. You do not have permission to update loan ID ${req.params.id}.`,
  });
};

// DELETE loan
export const deleteLoan = (req: Request, res: Response) => {
  res.status(403).json({
    error: `Access denied. You do not have permission to delete loan ID ${req.params.id}.`,
  });
};
