import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCoSZN3GJGvsnRY49O-S5MYfarAWGdYbXQ",
  authDomain: "krishi-link-2d161.firebaseapp.com",
  projectId: "krishi-link-2d161",
  storageBucket: "krishi-link-2d161.appspot.com", // fixed
  messagingSenderId: "558663614345",
  appId: "1:558663614345:web:d41cf536b98f92a35e6b58",
};

const app = initializeApp(firebaseConfig);

export default app;
