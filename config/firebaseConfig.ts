import admin from "firebase-admin";
import service_account from "../assignment-4-e171d-firebase-adminsdk-fbsvc-df8c6b127d.json";

if (!admin.apps.length && process.env.NODE_ENV !== "test") {
  admin.initializeApp({
    credential: admin.credential.cert(service_account as admin.ServiceAccount),
  });
}

export { admin };
