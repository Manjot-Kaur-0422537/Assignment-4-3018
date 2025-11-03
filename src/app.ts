import express from "express";
import { loggerMiddleware } from "./api/v1/middleware/logger";

const app = express();

app.use(express.json());

// Use logger middleware 
app.use(loggerMiddleware);

// Base route
app.get("/", (req, res) => {
  res.send("Loan Application API is running");
});

export default app;
