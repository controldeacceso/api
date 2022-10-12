import env from '../env';
import * as fb from 'firebase-admin'

export const auth = fb.initializeApp({
	credential: fb.credential.cert(env.firebase),
});
export const db = auth.firestore();
