import fs from "fs";
import path from "path";
import morgan from "morgan";

// Create logs directory if it doesn’t exist
const logDir = path.join(__dirname, "../../../../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logDir, "access.log"), {
  flags: "a",
});

// Morgan middleware for logging requests
const logger = morgan("combined", { stream: accessLogStream });

// Also log requests to the console in development
const consoleLogger = morgan("dev");

export { logger, consoleLogger };
