import * as firebase from 'firebase';

const config = {
  apiKey: "yourapikey",
  authDomain: "your-app-name.firebaseapp.com",
  databaseURL: "https://your-app-name.firebaseio.com",
  projectId: "your-app-name",
  storageBucket: "your-app-name.appspot.com",
  messagingSenderId: "senderid"
};

firebase.initializeApp(config);

export default firebase;