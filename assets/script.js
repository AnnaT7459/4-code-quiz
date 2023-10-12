// added timer with H. Burke
var timeEl = document.querySelector("#timer");
var startBtn = document.querySelector("#startBtn")
var timeOut = document.querySelector("#timeOut")

function startQuiz() {
  timerCount = 5;
  startTime();
  getQuestion();
}

startBtn.addEventListener("click", startQuiz)
function startTime() {
  timer = setInterval(function() {
    timerCount -- ;
    timeEl.textContent = timerCount + " seconds remaining"
    if(timerCount === 0) {
      endQuiz()
      clearInterval(timer);
    }
  }, 1000)
}
function endQuiz() {
  timeOut.textContent = "Time's Up!"
  if (timerCount === 0) {
    clearInterval(timer)
  }
}


var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 'alerts',
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 'parentheses',
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 'all of the above',
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 'quotes',
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 'console.log',
    },
  ];

  var currentQuestionIndex = 0;
//   call function to go to the next question
  var time = questions.length * 15;
  var timerId;
  
  // variables to reference DOM elements
  var questionsEl = document.getElementById('questions');
  // var timerEl = document.getElementById('time');
  var choicesEl = document.getElementById('choices');
  var submitBtn = document.getElementById('submit');
  // var startBtn = document.getElementById('start');


  function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion)
  
    // update title with current question
    var titleEl = document.getElementById('question-title');
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = '';
  
    // loop over choices
    for (var i = 0; i < currentQuestion.choices.length; i++) {
      // create new button for each choice
      var choice = currentQuestion.choices[i];
      var choiceNode = document.createElement('button');
      choiceNode.setAttribute('class', 'choice');
      choiceNode.setAttribute('value', choice);
  
      choiceNode.textContent = i + 1 + '. ' + choice;
  
      // display on the page
      choicesEl.appendChild(choiceNode);
    }
  }
  getQuestion()
  function questionClick(event) {
    var buttonEl = event.target;
  
    // check if user guessed wrong
    if (buttonEl.value !== questions[currentQuestionIndex].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
    }
    // move to next question
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
     // quizEnd();
    } else {
      getQuestion();
    }
  }
  // user clicks on element containing choices
choicesEl.onclick = questionClick;