// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc,} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9gF63LiuWK6tI6X00O6yxHCxyzEUuDD0",
  authDomain: "langaugelearningapplication.firebaseapp.com",
  projectId: "langaugelearningapplication",
  storageBucket: "langaugelearningapplication.appspot.com",
  messagingSenderId: "1035471567081",
  appId: "1:1035471567081:web:55f5af33cf8ee992b35878",
  measurementId: "G-4NWMXC6HER"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app);
const analytics = getAnalytics(app);


const googleProvider = new GoogleAuthProvider();

// Logging in with Google Email and Password
const signInWithGoogle = async () => 
{
  try 
  {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) 
    {
      await addDoc(collection(db, "users"), 
      {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } 
  catch (err) 
  {
    console.error(err);
    alert(err.message);
  }
};

// Logging in with Email and password
const logInWithEmailAndPassword = async (email, password) => 
{
  try 
  {
    await signInWithEmailAndPassword(auth, email, password);
  } 
  catch (err) 
  {
    console.error(err);
    alert(err.message);
  }
};

// Sign-up (Register) with Email and Password
const registerWithEmailAndPassword = async (name, email, password) => 
{
  try 
  {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } 
  catch (err) 
  {
    console.error(err);
    alert(err.message);
  }
};

// A function that will send a password reset link to an email address:
const sendPasswordReset = async (email) => 
{
  try 
  {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } 
  catch (err) 
  {
    console.error(err);
    alert(err.message);
  }
};

// Logout a user
const logout = () => 
{
  signOut(auth);
};

// Export all functions
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};