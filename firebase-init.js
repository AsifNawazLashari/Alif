// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from "firebase/app";

// Add the Firebase products that you want to use
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpZfPitBi12rkyzfyV1-scSvCc32jFAWE",
  authDomain: "science-ki-duniya.firebaseapp.com",
  projectId: "science-ki-duniya",
  storageBucket: "science-ki-duniya.appspot.com",
  messagingSenderId: "271115609150",
  appId: "1:271115609150:web:a0dfc810aee52a978cdd6f",
  measurementId: "G-KBHX5S9PX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
document.addEventListener('DOMContentLoaded', function() {
  // Get reference to the signup form element
  const signUpForm = document.getElementById('signup-form');

  // Add event listener for form submission
  signUpForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data
    const formData = new FormData(signUpForm);

    // Log the form data to the console (for debugging)
    console.log('Form Data:', formData);

    // Handle form submission (e.g., send data to Firebase Authentication)
    // Add your code to handle form submission here
  });
});

