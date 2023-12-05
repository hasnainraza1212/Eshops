import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getFirestore, collection, onSnapshot, doc, setDoc, query, where ,updateDoc , deleteDoc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, deleteObject, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";
import { getAuth, signInWithEmailAndPassword   } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCcEXhXESgHUpEHeYPyWO4llT0xhekEQzY",
  authDomain: "eshops-bbba3.firebaseapp.com",
  projectId: "eshops-bbba3",
  storageBucket: "eshops-bbba3.appspot.com",
  messagingSenderId: "716704777298",
  appId: "1:716704777298:web:8714a34e18e671bba24b8b",
  measurementId: "G-MZ945J4WD4"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth();

export {
  db, collection, onSnapshot, doc, deleteDoc, storage, deleteObject, ref,setDoc ,uploadBytesResumable, getDownloadURL, updateDoc , query, where, signInWithEmailAndPassword , auth
}