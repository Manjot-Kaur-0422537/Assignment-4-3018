import express from "express";
import { admin } from "../../../../config/firebaseAdmin";

const router = express.Router();

router.post("/set-role", async (req, res) => {
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
