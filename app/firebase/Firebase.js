import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDbItDLNvIU4BZNktUe4u7UY49MakWeI54",
  authDomain: "rn-chatapp.firebaseapp.com",
  databaseURL: "https://rn-chatapp.firebaseio.com",
  projectId: "rn-chatapp",
  storageBucket: "rn-chatapp.appspot.com",
  messagingSenderId: "1016875638429"
};

firebase.initializeApp(config);

export default firebase;