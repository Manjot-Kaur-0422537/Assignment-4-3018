import express from "express";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";
import loanRoutes from "./api/v1/routes/loanRoutes";
import { accessLogger, errorLogger, consoleLogger } from "./api/v1/middleware/logger";
import { errorHandler } from "./api/v1/middleware/errorHandler";

const app = express();

// JSON and URL-encoded middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === "production") {
  app.use(accessLogger);
  app.use(errorLogger);
} else {
  app.use(consoleLogger);
}

// Register API routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/loans", loanRoutes);  

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use(errorHandler);

export default app;
