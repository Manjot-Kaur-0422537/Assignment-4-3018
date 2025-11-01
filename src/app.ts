import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Base route
app.get("/", (req, res) => {
  res.send("Loan Application API is running");
});

export default app;
