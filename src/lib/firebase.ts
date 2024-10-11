import "server-only"
import admin from 'firebase-admin';
import { FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET } from '@/config';


if (!admin.apps.length) {

  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: FIREBASE_CLIENT_EMAIL,
      projectId: FIREBASE_PROJECT_ID,
    }),
    databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
    storageBucket: FIREBASE_PROJECT_ID + ".appspot.com"
  });
}


export const firebaseStorage = admin.storage();
