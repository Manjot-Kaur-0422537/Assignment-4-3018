import morgan, { StreamOptions } from "morgan";
import fs from "fs";
import path from "path";

// Ensure logs directory exists
const logsDir = path.join(__dirname, "../../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// File streams
const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), { flags: "a" });
const errorLogStream: StreamOptions = {
  write: (message) => fs.appendFileSync(path.join(logsDir, "error.log"), message),
};

// Logger middlewares
const accessLogger = morgan("combined", { stream: accessLogStream });
const errorLogger = morgan("combined", {
  stream: errorLogStream,
  skip: (_, res) => res.statusCode < 400,
});
const consoleLogger = morgan("dev");

// Export loggers for use in app and tests
export { accessLogger, errorLogger, consoleLogger };
