
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChzf4rew_WfRDS8Pdoos0l08Uc3FEn5bw",
  authDomain: "quathdata-c8dfa.firebaseapp.com",
  projectId: "quathdata-c8dfa",
  storageBucket: "quathdata-c8dfa.appspot.com",
  messagingSenderId: "226919654032",
  appId: "1:226919654032:web:651ef00e9406f9f87fee15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)

export {app,database}