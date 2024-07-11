// lib/auth.js
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      return { error: "Error getting credential", user: null, token: null };
    }

    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    return { error: null, user, token };
  } catch (error) {
    return { error: "Something went wrong", user: null, token: null };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
