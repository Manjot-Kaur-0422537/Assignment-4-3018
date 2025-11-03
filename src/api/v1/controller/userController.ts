import { Request, Response } from "express";
import {admin} from "config/firebaseConfig";

// Set a custom claim (role) for a user
export const setCustomClaim = async (req: Request, res: Response) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ success: false, message: "UID and role are required" });
  }

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    return res.status(200).json({ success: true, message: `Role '${role}' assigned to user ${uid}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to set custom claim", error });
  }
};

// Get a user's custom claims
export const getUserClaims = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const user = await admin.auth().getUser(uid);
    return res.status(200).json({ success: true, claims: user.customClaims || {} });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to retrieve claims", error });
  }
};
