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
        const questionId = childSnapshot.key;
        redirectToAnswerPage(questionId);
      });

      // Append the question HTML to the questions list
      questionsListElem.appendChild(questionItem);
    });

    loadingElem.style.display = 'none';
  }, function(error) {
    console.error('Error loading questions:', error);
  });
}

// Function to format timestamp
function formatTimestamp(timestamp) {
  // Format timestamp as required
}

// Function to redirect to answer page
function redirectToAnswerPage(questionId) {
  window.location.href = 'answers.html?questionId=' + questionId;
}

// Function to ask a new question
const askQuestionButton = document.getElementById('askQuestionButton');
if (askQuestionButton) {
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
} else {
  console.error('Ask Question button not found');
}

// Function to logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
  logoutButton.addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
      // Sign-out successful, redirect to login page
      window.location.href = 'login.html';
    }).catch(function(error) {
      // An error happened
      console.error('Sign out error:', error);
    });
  });
} else {
  console.error('Logout button not found');
}
