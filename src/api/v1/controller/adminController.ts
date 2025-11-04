import { Request, Response } from "express";
import {admin} from "../../../../config/firebaseConfig";

// List all users (admin action)
export const listAllUsers = async (req: Request, res: Response) => {
  try {
    const listUsersResult = await admin.auth().listUsers(1000);
    return res.status(200).json({ success: true, users: listUsersResult.users });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to list users", error });
  }
};
