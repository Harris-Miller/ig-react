import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB9UdqjSPaWyhjFUiXQWlaSZDs4NOUou_I",
  authDomain: "ig-clone-91950.firebaseapp.com",
  databaseURL: "https://ig-clone-91950.firebaseio.com",
  projectId: "ig-clone-91950",
  storageBucket: "ig-clone-91950.appspot.com",
  messagingSenderId: "1057523870699"
};

firebase.initializeApp(config);

firebase.auth.Auth.Persistence.LOCAL

export const database = new firebase.database();
export const storage = new firebase.storage();
export const auth = new firebase.auth();

auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
