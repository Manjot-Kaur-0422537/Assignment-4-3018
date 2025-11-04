import admin from "firebase-admin";
import { initializeApp, cert, getApps, getApp, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "../assignment-4-e171d-firebase-adminsdk-fbsvc-df8c6b127d.json";

const app = !getApps().length
  ? initializeApp({ credential: cert(serviceAccount as ServiceAccount) })
  : getApp();

export const firebaseAuth = getAuth(app);
export { admin };
