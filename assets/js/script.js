var curQuestion = document.querySelector(".current-question");
var ans1 = document.querySelector("#ans1");
var ans2 = document.querySelector("#ans2");
var ans3 = document.querySelector("#ans3");
var ans4 = document.querySelector("#ans4");
var ans1label = document.querySelector("#ans1label");
var ans2label = document.querySelector("#ans2label");
var ans3label = document.querySelector("#ans3label");
var ans4label = document.querySelector("#ans4label");
var timer = document.querySelector("#timer");
var btnStart = document.querySelector(".btnStart");
var btnPrev = document.querySelector(".btnPrev");
var btnNext = document.querySelector(".btnNext");
var btnSave = document.querySelector(".btnSave");
var qResult = document.querySelector(".result");
var scoreHistory = document.querySelectorAll(".quest-outcome");
var answer = document.querySelectorAll("input[type=radio]");
var leaderBoard = document.querySelectorAll(".saved-score");

var QuestionNo = 1;
var correctAns = 0;
var selectedAns = 0;
var minute = 4;
var second = 60;
var totalCorrect = 0;
var timerInterval = "";

 // Stores the questions, options, and answers, in key/value pairs. Contains a second
 // array to store the question option. 
var questionList =[
  {
    question: "Which built in Method returns the length of the string?",
    option: ["len", "size", "length", "total"],
    answer: 3
  },
  {
    question: "How do you add an element to the end of an array?",
    option: ["push()", "pop()", "shift()", "splice()"],
    answer: 1
  },
  {
    question: "Which statement will set the cost variable = 10.00?",
    option: ["cost === 10.00", "cost = 10.00", "!cost = 10.00", "cost == 10.00"],
    answer: 2
  },
  {
    question: "Which statement is correct for changing this HTML element: <p id='demo'> This is a paragraph. </p>?",
    option: ["document.getElementById('demo').innerHTML = 'Hello World'", "document.getElementByName('p').innerHTML = 'Hello World'"
    , "#demo.innerHTML = 'Hello World'", "document.getElement('p').innerHTML = 'Hello World'"],
    answer: 1
  },
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    option: ["<script src='script.js'>", "<script name='script.js'>","<script href='script.js'>","<script file='script.js'>"],
    answer: 1
  },
  {
    question: "How do you write 'Hello World! in an alert box?",
    option: ["msg('Hello World!')", "alertBox('Hello World!')", "msgBox('Hello World!')", "alert('Hello World!')"],
    answer: 4
  },
  {
    question: "How do you write an IF statement in Javascript?",
    option: ["if i = 5 then", "if i = 5", "if(i == 5)", "if i == 5 then"],
    answer: 3
  },
  {
    question: "How do you call a function named myFunction in Javascript?",
    option: ["call function myFunction()", "myFunction()", "myFunction:", "call myFunction()"],
    answer: 2
  },
  {
    question: "Which is the correct way to write an array in Javascript?",
    option: ["var colors = 'red','green','blue'", "var colors = ['red','green','blue']", "var colors = ('red','green','blue')",
    "var colors = (1:'red',2:'green',3:'blue')"],
    answer: 2
  },
  {
    question: "How do you round the number 7.25 to the nearest integer?",
    option: ["rnd(7.25)", "round(7.25)", "Math.rnd(7.25)", "Math.round(7.25)"],
    answer: 4
  }
];

var unanswered=[1,2,3,4,5,6,7,8,9,10]; // Stores the unanswered question numbers

function init(){
  // initialize the variables for each new game. 
  btnStart.disabled = true;
  btnNext.disabled = false;
  btnPrev.disabled = false;
  btnStart.disabled = true;
  QuestionNo = 1;
  correctAns = 0;
  selectedAns = 0;
  minute = 4;
  second = 60;
  totalCorrect = 0;
  unanswered=[1,2,3,4,5,6,7,8,9,10];
  // make sure the current results have been cleared. 
  for (i=0; i < scoreHistory.length; i++) {
    scoreHistory[i].textContent = i+1 + ". ";
  }
};

function startTimer(){
  timerInterval = setInterval(function() {
    if(minute == 0 && second == 1) {
      timer.textContent = "00:00";
      clearInterval();
      qResult.textContent = "The time has expired, the quiz is over!"
      btnStart.disabled = false; // allows for a new quiz to be started.
      btnSave.disabled = false; 
    }else {
      second--;
      if(second ==0) {
        minute--;
        second= 60;
        if(minute==0) {
          minute = minute;
          }
        }
        if(minute.toString().length ==1) {
          minute = "0"+minute;
        }
        if(second.toString().length ==1) {
          second = "0"+second;
        }
        timer.textContent = minute + ":" + second;
      }
    },1000);
};
function startQuiz() {
  init();
  getResults();
  startTimer();
  loadQuestion();
};
function prevQuestion() {
  if(QuestionNo!==1){
    QuestionNo--;
    loadQuestion();
  };
};
function nextQuestion () {
  if(QuestionNo!==10){
    QuestionNo++;
    loadQuestion();
  };
};
function loadQuestion() {
     // Get the question & options from the questionList array. 
     curQuestion.textContent = QuestionNo + ". " + questionList[QuestionNo -1].question;
     ans1label.textContent = questionList[QuestionNo -1].option[0];
     ans2label.textContent = questionList[QuestionNo -1].option[1];
     ans3label.textContent = questionList[QuestionNo -1].option[2];
     ans4label.textContent = questionList[QuestionNo -1].option[3];
     correctAns = questionList[QuestionNo -1].answer;
     // Uncheck the radio buttons once the new question has loaded. 
     let radios = document.getElementsByTagName('input');
     for (i=0; i < radios.length; i++) {
        radios[i].checked = false;
     };
     qResult.textContent = "";
};
function checkAnswer(){
  const index = unanswered.indexOf(QuestionNo);
  // Remove the question number from the unanswered array. 
  if (index > -1) {
    unanswered.splice(index, 1);
    console.log(unanswered);
  };
  
  // Store the answer selected by the user for comparison to the correct answer. 
  if(ans1.checked){
    selectedAns = 1;
  };
  if(ans2.checked){
    selectedAns = 2;
  };
  if(ans3.checked){
    selectedAns = 3;
  };
  if(ans4.checked){
    selectedAns = 4;
  };

  if(selectedAns == correctAns){
     scoreHistory[QuestionNo-1].textContent = QuestionNo + ". Correct!";
     totalCorrect++;
  } else {
    scoreHistory[QuestionNo-1].textContent = QuestionNo + ". Incorrect!";
    // 10 second penalty for incorrect answers. 
    if(second >=10) {
      second-=10;
    } else if (minute==0){
      minute =0;
      second = 1;
    } else {
      minute--;
      second = 60-second;
    }
    // stop the interval and start again with the adjusted time of minus 10 seconds for an incorrect answer. 
    clearInterval(timerInterval);
    startTimer();
  };

  // Update the result message display. 
  qResult.textContent = "The correct answer is: " + correctAns + " you selected: " + selectedAns;
  // If the unanswered array is empty, then the test is over, stop the timer and show the results. 
  if(unanswered.length==0){
    clearInterval(timerInterval);
    btnStart.disabled = false;
    btnPrev.disabled = true;
    btnNext.disabled = true;
    btnSave.disabled = false;
  }
};

function saveResults() {
  btnSave.preventDefault;
  // Change this to a hidden div that displays when the quiz is over. 
  var yourInitials = prompt("Enter in your initials");

  var highScore = {
    initials: yourInitials,
    score: Math.floor(totalCorrect / 10 * 100)
  }

  var a = [];

  // Parse the data back into an array of objects. 
  a = JSON.parse(localStorage.getItem("highScores")) || [];
  a.push(highScore); // Push in the new data. 
 
  // Serialize the data array back to a string and store it in local storage. 
  localStorage.setItem("highScores", JSON.stringify(a));
  btnSave.disabled = true;

  getResults(); // update the leaderboard. 
};

function getResults() {
  var priorResults = JSON.parse(localStorage.getItem("highScores")) || [];
  console.log(priorResults);
  
  // Loop through the array and access the correct index and key value pairs to display under high scores. 
  if(priorResults !== null){
    for(i=0; i < priorResults.length; i++){
      leaderBoard[i].textContent = i+1 + ". " + priorResults[i].initials + " - " + priorResults[i].score
    }
  }
};

// Event listeners for all buttons and the 4 radio buttons. 
btnStart.addEventListener("click",startQuiz);
btnPrev.addEventListener("click",prevQuestion);
btnNext.addEventListener("click",nextQuestion);
btnSave.addEventListener("click",saveResults);
ans1.addEventListener("click", checkAnswer);
ans2.addEventListener("click", checkAnswer);
ans3.addEventListener("click", checkAnswer);
ans4.addEventListener("click", checkAnswer);

getResults(); // Get the high scores when the page first loads. 