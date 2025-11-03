import express from "express";
import userRoutes from "./api/v1/routes/userRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app = express();
app.use(express.json());

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

export default app;
