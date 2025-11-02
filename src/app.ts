import express from "express";
import { logger, consoleLogger } from "./api/v1/middleware/logger";

const app = express();

app.use(express.json());

// Log requests to file and console
app.use(logger);
app.use(consoleLogger);

// Base route
app.get("/", (req, res) => {
  res.send("Loan Application API is running");
});

export default app;
