import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAsEnOicyN5gZQaigd0kSjHCh552GQlnSs",
  authDomain: "printshirt-a4079.firebaseapp.com",
  databaseURL: "https://printshirt-a4079-default-rtdb.firebaseio.com",
  projectId: "printshirt-a4079",
  storageBucket: "printshirt-a4079.appspot.com",
  messagingSenderId: "374513389218",
  appId: "1:374513389218:web:d71dbc3a2cd06b5710d1fb",
  measurementId: "G-NM49G4Y27B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
