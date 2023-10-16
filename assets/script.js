// pulls id of the button tag in HTML
var startBtn = document.getElementById("startButton");
// pulls id from the div tag in HTML and the query selector allows me to manipulate the id in a broad sense
var timerEl = document.querySelector("#timer");
// pulls id from the div tag in HTML and the query selector allows me to manipulate the id in a broad sense
var timeOut = document.querySelector("#timeOut");
// pulls id from the h2 tag in HTML and the query selector allows me to manipulate the id in a broad sense
var question = document.querySelector("#questionText");
// pulls id from the h3 tag in HTML and the query selector allows me to manipulate the id in a broad sense
var choices = document.querySelector("#choicesText");
// created variable to set the question "counter" at 0 for the 1st question, then it will increment to the next question through 4 since there are 5 questions
var currentQuestionIndex = 0;
// variable to set the timer
var timerCount = 75;
// starting score at 0
var score = 0
// this will show the user their final score at the end of the quiz
var finalScoreElement = document.getElementById("final-score");
finalScoreElement.textContent = score;

var viewHighScoresBtn = document.getElementById("view-high-scores");

var retakeQuizBtn = document.getElementById("retake-quiz");

// created an event listener when the "Start Quiz" button is clicked. That triggers the startQuiz function.
startBtn.addEventListener("click", startQuiz);

// this function starts the timer and displays the 1st question
function startQuiz() {
  // this hides the Start Quiz button once it's been clicked
  startBtn.style.display = "none";
  timerCount = 75;
  startTimer();
  displayQuestion();
}

// when the Start Quiz button is clicked, the timer begins to countdown.
function startTimer() {
  var timer = setInterval(function () {
    //  -- means decrement
    timerCount--;
    // this if statement says that if the timer runs out, it will trigger the countEnd function and as the timer is counting down, it will tell the user how many seconds they have left
    if (timerCount === 0) {
      clearInterval(timer);
      countEnd();
    } else {
      timerEl.textContent = timerCount + " seconds left!";
    }
    // this says there are 1000 miliseconds in each "second" before it decrements
  }, 1000);
}

// this function stops the timer and alerts the user that they ran out of time. Then it clears out the current question and their choices in order to move onto the next
function countEnd() {
  clearInterval(timer);
  timeOut.textContent = "All done!";
  question.textContent = "";
  choices.innerHTML = "";
}

// this function is also triggered when the Start Quiz button is clicked.
function displayQuestion() {
  // this is a boolean to check that the index of questions being displayed is "tracked", if the last question is answered, then that means the user has reached the end of the quiz, otherwise, the quiz continues.
  if (currentQuestionIndex < questionContainer.length) {
    var currentQuestion = questionContainer[currentQuestionIndex];
    question.textContent = currentQuestion.question;
    console.log("Displaying question:", currentQuestion.question)
    // this clears out the answer choices
    choices.innerHTML = "";
    // this for loop tells the computer to start with the first question (0) and gives the answer choices. Then it moves on to the next question.
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      // this goes to the question being displayed and creates an index for the answer choices
      var choice = currentQuestion.choices[i];
      // this makes all the answer choices into buttons
      var choiceButton = document.createElement("button");
      // able to style buttons in CSS
      choiceButton.classList.add("custom-button-class");
      choiceButton.textContent = choice;
      // this will allow me to style the button
      choiceButton.setAttribute("class", "choice");
      // this event listener checks the user's answer once they click one of the choices to see if it's right or wrong
      choiceButton.addEventListener("click", checkAnswer);
      // this adds all the new elements to the choice buttons
      choices.appendChild(choiceButton);
    }
    // this tells the computer when to move on to the next question
  } else {
    // function described above
    countEnd();
  }
}

// The event that fires this function is the "clicking" of a choices button
function checkAnswer(event) {
  // this tells the computer that the click was to select that answer
  var selectedAnswer = event.target.textContent;
  // this tells the computer that the question being displayed comes from the list of questions in the question bank
  var currentQuestion = questionContainer[currentQuestionIndex];
  // this tells the computer that the answer property in the question property is the correct answer
  var correctAnswer = currentQuestion.answer;
  // this pulls the h4 tag id
  var feedbackElement = document.getElementById("feedback");
  console.log("Selected Answer:", selectedAnswer);
  console.log("Correct Answer:", correctAnswer);
  console.log("Current Question Index:", currentQuestionIndex);
  // this tells the computer that if the correct answer is chosen, the feedback will tell the user they are correct, or otherwise "wrong"
  if (selectedAnswer === correctAnswer) {
    // Correct answer
    feedbackElement.textContent = "Correct!";
    // Award 10 points
    score += 10;
    var scoreElement = document.getElementById("score");
    scoreElement.textContent = "Your Score: " + score;
  } else {
    feedbackElement.textContent = "Wrong!";
    // Deduct 10 seconds from the timer
    timerCount -= 10;
    if (timerCount < 0) {
      timerCount = 0;
    }
  }
  timerEl.textContent = timerCount + " seconds left!";
  // // Increment the index after checking the answer for the current question
  currentQuestionIndex++;
  // displays the next question
  displayQuestion();
}

var questionContainer = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotation marks", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotation marks", "parentheses"],
    answer: "quotation marks",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

