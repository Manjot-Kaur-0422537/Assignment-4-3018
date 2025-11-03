import { Request, Response } from "express";
import admin from "firebase-admin";

/**
 * Set a custom claim (role) for a user.
 * Example: { role: "officer" }
 */
export const setCustomClaim = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json({ success: false, message: "UID and role are required" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    return res.status(200).json({ success: true, message: "Custom claim set successfully" });
  } catch (error) {
    console.error("Error setting custom claim:", (error as Error).message);
    return res.status(500).json({ success: false, message: "Failed to set custom claim" });
  }
};

/**
 * Retrieve custom claims for a specific user.
 */
export const getUserClaims = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ success: false, message: "UID is required" });
    }

    const userRecord = await admin.auth().getUser(uid);
    const claims = userRecord.customClaims || {};

    return res.status(200).json({ success: true, claims });
  } catch (error) {
    console.error("Error retrieving custom claims:", (error as Error).message);
    return res.status(500).json({ success: false, message: "Failed to retrieve custom claims" });
  }
};
