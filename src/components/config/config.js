import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAgACtJR9aaKjdOJRuFA_JHwEsPomKy_PM",
    authDomain: "newestprojects-2f2a7.firebaseapp.com",
    databaseURL: "https://newestprojects-2f2a7.firebaseio.com",
    projectId: "newestprojects-2f2a7",
    storageBucket: "newestprojects-2f2a7.appspot.com",
    messagingSenderId: "743452859420"
  };
const fire = firebase.initializeApp(config)
export { fire }