import { Request, Response } from "express";

export const getAllLoans = (req: Request, res: Response) => {
  res.json({ message: "Get all loan applications" });
};

export const getLoanById = (req: Request, res: Response) => {
  res.json({ message: `Get loan with ID ${req.params.id}` });
};

export const createLoan = (req: Request, res: Response) => {
  res.json({ message: "Create a new loan application" });
};

export const updateLoan = (req: Request, res: Response) => {
  res.json({ message: `Update loan with ID ${req.params.id}` });
};

export const deleteLoan = (req: Request, res: Response) => {
  res.json({ message: `Delete loan with ID ${req.params.id}` });
};
