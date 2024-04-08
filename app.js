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
    // Check for notifications
    checkNotifications(user.uid);
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

      // Fetch total number of replies for this question
      database.ref('replies/' + childSnapshot.key).once('value', function(replySnapshot) {
        const totalReplies = replySnapshot.numChildren(); // Get the total number of replies
        renderQuestion(question, childSnapshot.key, totalReplies); // Render the question with total replies
      });
    });

    // Hide loading element after rendering questions
    loadingElem.style.display = 'none';
  });
}

// Function to render each question with total replies
function renderQuestion(question, questionId, totalReplies) {
  // Create HTML for the question
  const questionItem = document.createElement('div');
  questionItem.classList.add('question');
  questionItem.setAttribute('data-id', questionId);
  questionItem.innerHTML = `
    <div class="question-title">${question.title}</div>
    <div class="question-details">
      Category: ${question.category || 'Uncategorized'} | 
      Asked by: ${question.username} - ${formatTimestamp(question.timestamp)} |
      Total Replies: ${totalReplies}
    </div>
  `;

  // Append the question HTML to the questions list
  document.getElementById('questionsList').appendChild(questionItem);
}

// Function to format timestamp
function formatTimestamp(timestamp) {
  // Format timestamp as required
}

// Function to check for new notifications
function checkNotifications(userId) {
  database.ref('notifications/' + userId).on('value', function(snapshot) {
    const notifications = snapshot.val();
    if (notifications) {
      // Show red dot for new notifications
      const notificationIcon = document.getElementById('notificationIcon');
      notificationIcon.innerHTML = '<i class="fas fa-bell"></i>';
      notificationIcon.style.color = 'red';
    }
  });
}

// Function to handle notifications
const notificationIcon = document.getElementById('notificationIcon');
notificationIcon.addEventListener('click', function() {
  // Show notification details when clicked
  // Implement logic to display notification details
  alert('Notification details will be displayed here.');
});

// Function to logout
const logoutIcon = document.getElementById('logoutIcon');
logoutIcon.addEventListener('click', function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful, redirect to login page
    window.location.href = 'login.html';
  }).catch(function(error) {
    // An error happened
    console.error('Sign out error:', error);
  });
});

// Call loadQuestions when the page loads
window.onload = function() {
  loadQuestions();
};
