// Firebase initialization
// User authentication, database reference, etc.

// Check if user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in, load questions
    loadQuestions();
  } else {
    // User is not signed in, redirect to login page
    window.location.href = 'login.html';
  }
});

// Function to load questions from Firebase database
function loadQuestions() {
  // Load questions from Firebase...
}

// Function to post a new question
function postQuestion(questionText) {
  // Post question to Firebase...
}

// Function to share a question
function shareQuestion(questionId) {
  // Implement sharing functionality...
}

// Function to like a question
function likeQuestion(questionId) {
  // Implement liking functionality...
}

// Event listeners for buttons
const askQuestionButton = document.getElementById('askQuestionButton');
askQuestionButton.addEventListener('click', function() {
  const questionText = prompt('Enter your question:');
  if (questionText) {
    postQuestion(questionText);
  }
});

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful, redirect to login page
    window.location.href = 'login.html';
  }).catch(function(error) {
    // An error happened
    console.error('Sign out error:', error);
  });
});
