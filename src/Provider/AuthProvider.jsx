import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { AuthContext } from "./AuthContext";


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // console.log(user);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const updatePassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleSignup = () => {
    return signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubcribe();
    };
  }, []);

  const authData = {
    user,
    loading,
    createUser,
    setUser,
    signIn,
    logout,
    updateUser,
    googleSignup,
    updatePassword,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
