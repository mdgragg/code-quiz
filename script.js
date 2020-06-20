// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

var whiteHeader = document.querySelector(".white-bg");
var enterScore = document.querySelector(".todos");




// create our questions
let questions = [
    {
        questionNumber : "Question 1/6:",
        question : "What is a scripting or programming language that allows you to implement complex features on web pages?",
        choiceA : "HTML",
        choiceB : "JavaScript",
        choiceC : "CSS",
        choiceD : "Word",
        correct : "B"
    },{
        questionNumber : "Question 2/6:",
        question : "Using _______ statement is how you test for a specific condition.",
        choiceA : "For",
        choiceB : "If",
        choiceC : "Switch",
        choiceD : "Select",
        correct : "B"
    },{
        questionNumber : "Question 3/6:",
        question : "The _______ method of an Array object adds and/or removes elements from an array.",
        choiceA : "Reverse",
        choiceB : "Shift",
        choiceC : "Slice",
        choiceD : "Splice",
        correct : "D"
    },{
        questionNumber : "Question 4/6:",
        question : "Inside which HTML element do we put the JavaScript?",
        choiceA : "&lt;js&gt;",
        choiceB : "&lt;scripting&gt",
        choiceC : "&lt;script&gt;",
        choiceD : "&lt;javascript&gt;",
        correct : "C"
    },{
        questionNumber : "Question 5/6:",
        question : "Is it possible to nest functions in JavaScript?",
        choiceA : "Yes",
        choiceB : "No",
        choiceC : "Somethimes",
        choiceD : "I wanted a 4th option",
        correct : "A"
    },{
        questionNumber : "Question 6/6:",
        question : "Which of the following is not a valid JavaScript variable name?",
        choiceA : "FirstAndLast",
        choiceB : "_first_and_last_names",
        choiceC : "2names",
        choiceD : "None of these",
        correct : "C"
    }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let TIMER;
let score = 0;
var countdown; 

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = q.question;
    questionNumber.innerHTML = q.questionNumber;
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);


function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";

    renderProgress();

    var timeLeft = 90,
    display = document.querySelector('#time');
    startTimer(timeLeft, display);
}


function startTimer(duration, display) {
    TIMER = duration
    countdown = setInterval(function () {
        minutes = parseInt(TIMER / 60, 10)
        seconds = parseInt(TIMER % 60, 10);

        minutes = minutes < 10 ? "" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--TIMER == 0) {
            TIMER == duration;
            scoreRender();
        }

    }, 1000);
}





function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}



function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }
    
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        scoreRender();
        
    }
}

function answerIsCorrect(){
   document.getElementById(runningQuestion).innerHTML += "<img src='images/right.png'>";
}
function answerIsWrong(){
    alert("For every wrong answer 10 seconds is deducted from your time.");
    TIMER -= 10;
    document.getElementById(runningQuestion).innerHTML += "<img src='images/wrong.png'>";
}


function scoreRender(){
    quiz.style.display = "none";
    scoreDiv.style.display = "block";
    whiteHeader.style.display = "block";
    enterScore.style.display = "block";
    
    clearInterval(countdown);
    
    const scorePerCent = Math.round(100 * score/questions.length);     
    scoreDiv.innerHTML += "<p>You answered "+ score + "/6 questions correctly</p>";
    scoreDiv.innerHTML += "<h1>"+ scorePerCent +"%</h1>";


}














var todoInput = document.querySelector("#todo-text");
var todoForm = document.querySelector("#todo-form");
var todoList = document.querySelector("#todo-list");
var todoCountSpan = document.querySelector("#todo-count");

var todos = []; // convert to object
// stringify 2 arrays objects 

//JSON.Parse

init();

function renderTodos() {
  // Clear todoList element and update todoCountSpan
  todoList.innerHTML = "";
  todoCountSpan.textContent = todos.length;

  // Render a new li for each todo
  for (var i = 0; i < todos.length; i++) {
    var todo = todos[i];

    var li = document.createElement("li");
    li.textContent = todo;
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Clear Score";

    li.appendChild(button);
    todoList.appendChild(li);
  }
}

function init() {
  // Get stored todos from localStorage
  // Parsing the JSON string to an object
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedTodos !== null) {
    todos = storedTodos;
  }

  // Render todos to the DOM
  renderTodos();
}

function storeTodos() {
  // Stringify and set "todos" key in localStorage to todos array
  localStorage.setItem("todos", JSON.stringify(todos));
}

// When form is submitted...
todoForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var todoText = todoInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (todoText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  todos.push(todoText);
  todoInput.value = "";

  // Store updated todos in localStorage, re-render the list
  storeTodos();
  renderTodos();
});

// When a element inside of the todoList is clicked...
todoList.addEventListener("click", function(event) {
  var element = event.target;

  // If that element is a button...
  if (element.matches("button") === true) {
    // Get its data-index value and remove the todo element from the list
    var index = element.parentElement.getAttribute("data-index");
    todos.splice(index, 1);

    // Store updated todos in localStorage, re-render the list
    storeTodos();
    renderTodos();
  }
});













