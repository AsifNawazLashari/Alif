// Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyA93kMK7VXwtvenkXAxWlZvJlPBlSaONR4",
  authDomain: "asifnawazlashari-85eff.firebaseapp.com",
  databaseURL: "https://asifnawazlashari-85eff-default-rtdb.firebaseio.com",
  projectId: "asifnawazlashari-85eff",
  storageBucket: "asifnawazlashari-85eff.appspot.com",
  messagingSenderId: "436734491671",
  appId: "1:436734491671:web:b4b4d4c4c590b4c8c47052",
  measurementId: "G-40RZ2LQPZN"
};

firebase.initializeApp(firebaseConfig);



// Reference to Firebase database
const database = firebase.database();

// Check user authentication state
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
  const questionsListElem = document.getElementById('questionsList');
  const loadingElem = document.getElementById('loading');
  loadingElem.style.display = 'block';

  // Reference to 'questions' node in database
  database.ref('questions').on('value', function(snapshot) {
    questionsListElem.innerHTML = '';

    snapshot.forEach(function(childSnapshot) {
      const question = childSnapshot.val();

      // Create HTML for the question
      const questionItem = document.createElement('div');
      questionItem.classList.add('question');
      questionItem.setAttribute('data-id', childSnapshot.key);
      questionItem.innerHTML = `
        <div class="question-title">${question.title}</div>
        <div class="question-details">
          Category: ${question.category || 'Uncategorized'} | 
          Asked by: ${question.username} - ${formatTimestamp(question.timestamp)}
        </div>
        <button class="shareButton">Share</button>
        <button class="likeButton">Like</button>
      `;

      // Event listener to redirect to answer page when clicked
      questionItem.addEventListener('click', function() {
        redirectToAnswerPage(childSnapshot.key);
      });

      // Append the question HTML to the questions list
      questionsListElem.appendChild(questionItem);
    });

    loadingElem.style.display = 'none';
  });
}

// Function to format timestamp
function formatTimestamp(timestamp) {
  // Format timestamp as required
}

// Event delegation for share and like buttons
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('shareButton')) {
    const questionId = event.target.parentElement.getAttribute('data-id');
    shareQuestion(questionId);
  }

  if (event.target.classList.contains('likeButton')) {
    const questionId = event.target.parentElement.getAttribute('data-id');
    likeQuestion(questionId);
  }
});

// Function to share a question
function shareQuestion(questionId) {
  // Implement sharing functionality
}

// Function to like a question
function likeQuestion(questionId) {
  // Implement liking functionality
}

// Function to redirect to answer page
function redirectToAnswerPage(questionId) {
  window.location.href = 'answers.html?questionId=' + questionId;
}

// Function to ask a new question
const askQuestionButton = document.getElementById('askQuestionButton');
askQuestionButton.addEventListener('click', function() {
  const questionText = prompt('Enter your question:');
  const category = prompt('Enter category (optional):');
  if (questionText) {
    const user = firebase.auth().currentUser;
    const question = {
      title: questionText,
      username: user.displayName || 'Anonymous',
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      category: category.trim() || null
    };
    database.ref('questions').push(question);
  }
});

// Function to logout
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
