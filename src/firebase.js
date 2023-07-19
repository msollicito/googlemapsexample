import firebase from "firebase";
require("firebase/auth");
require("firebase/database");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCFSuf28xexg5owdTuO8Ws1pxVUg9gLIs",
  authDomain: "seprojectdb.firebaseapp.com",
  projectId: "seprojectdb",
  storageBucket: "seprojectdb.appspot.com",
  messagingSenderId: "667112229281",
  appId: "1:667112229281:web:6329c635ffd244d430a3e0",
  measurementId: "G-7NETFE1EFW"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  console.log("firebase config error");
}

/*const itemsRef = firebase.database().ref("users");
    const user = {
      username: values.email2,
      password: values.password2,
      employeeID: values.EmployeeID
    };
    itemsRef.push(user);*/

//firebase.initializeApp(firebaseConfig);
//firebase.analytics();

export const auth = firebase.auth();
export const database = firebase.database();
