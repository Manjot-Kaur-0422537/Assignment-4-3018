import admin from "firebase-admin";
import serviceAccount from "./assignment-4-e171d-firebase-adminsdk-fbsvc-df8c6b127d.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const auth = admin.auth();
