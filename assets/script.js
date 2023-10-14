// added timer with H. Burke
var timeEl = document.querySelector("#countDown")
var startBtn = document.querySelector("#startBtn")
var timeOut = document.querySelector("#timeOut")

var timerCount = 5
var countDown;

var timeRemain



function startQuiz() {
  // applied setInterval function to global timer variable
  countDown = setInterval(function () {
    // -- = decrement
    timerCount--;
    timeEl.textContent = timerCount + " seconds remaining"
    if (timerCount === 0) {
      endQuiz()
      clearInterval(countDown);
    }
  }, 1000)
  // displays first question
  showQuestion();
}

startBtn.addEventListener("click", startQuiz)

function endQuiz() {
  // set value of the time remaining
  timeOut.textContent = "Time's Up!"
  clearInterval(countDown)
}


var questions = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotation marks", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    title: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotation marks", "parentheses"],
    answer: "quotation marks",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];

// global variables
// question index is 5, but starts with 0 then through 4
var allQs = 0;
// amount of time alloted for each question (15 sec) 
// questionsEl pulls all of the question elements from the array
// .length means there are 5 questions to answer/ 5 elements in the array
var timePerQ = questions.length * 15;
var questionsEl = document.getElementById("questions");
var timeEl = document.querySelector("#countDown")
var choicesEl = document.querySelector("#choices")

function showQuestion() {
  // displayQ represents the question that is presented on the screen. It must go to the questions element in order to know what question from the questions array to present to user
  var displayQ = questions[allQs];
  // In order for the question to be displayed, the question title element out of the questions array needs to be "called"
  var titleEl = document.getElementById("question-title")
  // this is the text that will show on the screen. From all the questions, the one that is presented to the user comes from the titles in the questions array
  titleEl.textContent = displayQ.title

  // remove choices from previous question
  choicesEl.innerHTML = " ";

  // this for loop will repeat the same process of providing the choices for each question (from the questions array) that is being displayed at the time 
  // var i = 0 means that it starts with the first item in the index (array)
  // i < displayQ.choices.length means that the process will continue until it reaches the end of the array contents
  // i++ means that it will move to the next element/question&choices in the questions array
  for (var i = 0; i < displayQ.choices.length; i++) {
    // defining choice as the choices from each question in the index array of question bank
    var choice = displayQ.choices[i];
    // creating buttons for each answer choice 
    var choicesBtn = document.createElement("button");
    // this will be used to style the choice buttons
    choicesBtn.setAttribute("class", "choice");
    // this will pull the content from the choice variable within the questions array)
    choicesBtn.setAttribute("value", choice)
    // This is the content that will be in each button: numbers each button starting @ 1. 
    choicesBtn.textContent = i + 1 + ". " + choice
    // this is how everything about the button will be displayed
    choicesEl.appendChild(choicesBtn);
  }
}


// var currentQuestionIndex = 0;
// //   call function to go to the next question
// var time = questions.length * 15;
// var timerId;

// // variables to reference DOM elements
// // var timerEl = document.getElementById('time');
// var choicesEl = document.getElementById('choices');
// var submitBtn = document.getElementById('submit');
// // var startBtn = document.getElementById('start');


// function getQuestion() {
//   // get current question object from array
//   var currentQuestion = questions[currentQuestionIndex];
//   console.log(currentQuestion)

//   // update title with current question
//   var titleEl = document.getElementById('question-title');
//   titleEl.textContent = currentQuestion.title;

//   // clear out any old question choices
//   choicesEl.innerHTML = '';

//   // loop over choices
//   for (var i = 0; i < currentQuestion.choices.length; i++) {
//     // create new button for each choice
//     var choice = currentQuestion.choices[i];
//     var choiceNode = document.createElement('button');
//     choiceNode.setAttribute('class', 'choice');
//     choiceNode.setAttribute('value', choice);

//     choiceNode.textContent = i + 1 + '. ' + choice;

//     // display on the page
//     choicesEl.appendChild(choiceNode);
//   }
// }
// getQuestion()
// function questionClick(event) {
//   var buttonEl = event.target;

//   // check if user guessed wrong
//   if (buttonEl.value !== questions[currentQuestionIndex].answer) {
//     // penalize time
//     time -= 15;

//     if (time < 0) {
//       time = 0;
//     }
//   }
//   // move to next question
//   currentQuestionIndex++;

//   // check if we've run out of questions
//   if (time <= 0 || currentQuestionIndex === questions.length) {
//     // quizEnd();
//   } else {
//     getQuestion();
//   }
// }
// // user clicks on element containing choices
// choicesEl.onclick = questionClick;