import firebase from "firebase/app";
// import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "@firebase/firestore";
import axios from "axios";

export const configurations = () => {
  console.log("NODE_ENV", process.env.NODE_ENV);
  const firebaseConfig = {
    apiKey: "AIzaSyDmN1_v47TLXhjyNPHLJbAQYh5yuceicY0",
    authDomain: "helphelper-2021.firebaseapp.com",
    projectId: "helphelper-2021",
    storageBucket: "helphelper-2021.appspot.com",
    messagingSenderId: "536892303959",
    appId: "1:536892303959:web:7b599f0a2c7ca7d4b35112",
    measurementId: "G-BF59R4Y1G5",
  };

  if (process.env.NODE_ENV === "development") {
    return firebaseConfig;
  } else if (process.env.NODE_ENV === "production") {
    return firebaseConfig;
  }
};

const firebaseConfig = configurations();

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
const db = firebase.firestore();
const baseUrl = "http://localhost:8000";
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});
export const signInWithGoogle = () =>
  auth
    .signInWithPopup(provider)
    .then((result) => {
      checkIfUserExists(result);
    })
    .catch(function (error) {
      console.log("error, error", error);
    });

export { db };

const checkIfUserExists = async (result) => {
  const apiUrl = `${baseUrl}/helpers/?user_id=${result.user.uid}`;
  await axios
    .get(apiUrl)
    .then((response) => response.data)
    .then((data) => {
      console.log(data);
      if (data.count === 0) {
        let dataToPost = {
          user_id: result.user.uid,
          display_name: result.user.displayName,
          email: result.user.email,
          photo_url: result.user.photoURL,
          login_time: new Date(),
        };
        const apiUrlMain = `${baseUrl}/helpers/`;
        fetch(apiUrlMain, {
          method: "POST",
          body: JSON.stringify(dataToPost),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => console.log("Success:", JSON.stringify(response)))
          .catch((error) => console.error("Error:", error));
      } else {
        const apiUrlMain = `${baseUrl}/helpers/`;
        let dataToPost = {
          user_id: result.user.uid,
          login_time: new Date(),
        };
        fetch(apiUrlMain, {
          method: "PATCH",
          body: JSON.stringify(dataToPost),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => console.log("Success:", JSON.stringify(response)))
          .catch((error) => console.error("Error:", error));
      }
    })
    .catch((err) => console.log(err));
};
