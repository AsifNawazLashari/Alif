// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpZfPitBi12rkyzfyV1-scSvCc32jFAWE",
  authDomain: "science-ki-duniya.firebaseapp.com",
  databaseURL: "https://science-ki-duniya-default-rtdb.firebaseio.com",
  projectId: "science-ki-duniya",
  storageBucket: "science-ki-duniya.appspot.com",
  messagingSenderId: "271115609150",
  appId: "1:271115609150:web:a0dfc810aee52a978cdd6f",
  measurementId: "G-KBHX5S9PX5"
};"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.addEventListener('DOMContentLoaded', function() {
  // FirebaseUI configuration
  var uiConfig = {
    signInSuccessUrl: 'https://asifnawazlashari.github.io/Alif/blog.html', // Corrected the URL format
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      firebase.auth.AnonymousAuthProvider.PROVIDER_ID // Add this line to include anonymous sign-in option
    ],
    // Other configuration options as needed
  };

  // Initialize the FirebaseUI Auth widget
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // Start the FirebaseUI Auth flow
  ui.start('#firebaseui-auth-container', uiConfig);
});
