import express from "express";
import { admin } from "../../../../config/firebaseAdmin";

const router = express.Router();

// Middleware to verify token and check admin role
const verifyAdmin = async (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    // ✅ Check if user has admin role
    if (decodedToken.role !== "admin") {
      return res.status(403).json({ error: "Access denied: insufficient role" });
    }

    req.user = decodedToken;
    next();
  } catch (error: any) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Admin-only route
router.post("/set-role", verifyAdmin, async (req, res) => {
  try {
    const { uid, role } = req.body;
    if (!uid || !role) {
      return res.status(400).json({ error: "uid and role are required" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });
    res.json({ message: `Role '${role}' assigned to user ${uid}` });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
