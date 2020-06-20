function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}


const start = document.getElementById("start");

start.addEventListener("click",startQuiz);
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }else answer.preventDefault();
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        
        QuestionNumber();
        showProgress();

    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
function QuestionNumber() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("question-number");
    element.innerHTML = "Question " + currentQuestionNumber;
}; 

function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> You scored: " + quiz.score +  " out of " + quiz.questions.length + "<br>" + "Time:";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question("What is a scripting or programming language that allows you to implement complex features on web pages", ["HTML", "JavaScript", "CSS", "Word"], "JavaScript"),
    new Question("Using _______ statement is how you test for a specific condition.", ["For", "If", "Switch", "Select"], "If"), 
    new Question("Inside which HTML element do we put the JavaScript?", ["&lt;js&gt;", "&lt;scripting&gt;","&lt;script&gt;", "&lt;javascript&gt;"], "&lt;script&gt;"), 
    new Question("______method evaluates a string of JavaScript code in the context of the specified object.", ["Eval", "ParseInt", "ParseFloat", "Efloat"], "Eval"), 
    new Question("The _______ method of an Array object adds and/or removes elements from an array.", ["Reverse", "Shift", "Slice", "Splice"], "Splice"), 
    new Question("Which of the following is not a valid JavaScript variable name?", ["2names", "_first_and_last_names", "FirstAndLast", "None of these"], "2names"), 
    new Question("Is it possible to nest functions in JavaScript?", ["Yes", "No", "Sometimes", "I wanted a 4th option"], "Yes"), 
    new Question(" ____________ is the tainted property of a window object.", ["Pathname", "Protocol", "Host", "Defaultstatus"], "Defaultstatus"), 
    new Question(" _____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.", ["Server-side", "Client-side", "Local", "Native"], "Client-side") 
];



 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();