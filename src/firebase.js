import firebase from "firebase";
import "firebase/storage";
const firebaseConfig = {
//   apiKey: "AIzaSyA9YtNWSUq0sq3WVzRBA5iuyLa_wNDnyCc",
//   authDomain: "pet-react-89e34.firebaseapp.com",
//   projectId: "pet-react-89e34",
//   storageBucket: "pet-react-89e34.appspot.com",
//   messagingSenderId: "917936561928",
//   appId: "1:917936561928:web:4868f0a106b5bc4e2396bd",
//   measurementId: "G-D0XZKN2BH9",
  
  apiKey: "AIzaSyAfTJ_9XIl_-Aul--AFKH-sMshUoSF36W0",
  authDomain: "hnshop-45561.firebaseapp.com",
  projectId: "hnshop-45561",
  storageBucket: "hnshop-45561.appspot.com",
  messagingSenderId: "938859158692",
  appId: "1:938859158692:web:550d015e859d86e4689a31",
  measurementId: "G-5Y36MYCB4R"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
