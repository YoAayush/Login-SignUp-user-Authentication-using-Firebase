import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiC2uJEg_A1vqIdGTL5D2aUY9OIs5BcY8",
  authDomain: "authentication-practise-5a388.firebaseapp.com",
  projectId: "authentication-practise-5a388",
  storageBucket: "authentication-practise-5a388.appspot.com",
  messagingSenderId: "512054696242",
  appId: "1:512054696242:web:adc3b77fb5c8f3aead1f2b"
};

export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const dataCollection = collection(db,"login-details");
export const auth = getAuth(app);