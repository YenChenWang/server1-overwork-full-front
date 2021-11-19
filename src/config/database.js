import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyBhMq2YQnsdDfPMHsEUO2n-42xQLR1MsXM",
  authDomain: "fir-web-d11ce.firebaseapp.com",
  databaseURL: "https://fir-web-d11ce-default-rtdb.firebaseio.com",
  projectId: "fir-web-d11ce",
  storageBucket: "fir-web-d11ce.appspot.com",
  messagingSenderId: "910674546570",
  appId: "1:910674546570:web:ba26a451f64a42ba4e4273",
  measurementId: "G-XMBN5MKQWP"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
