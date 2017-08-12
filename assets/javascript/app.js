$(document).ready(function(){
var correctAnswers = 0;
var incorrectAnswers = 0;
var unAnswered = 0;
var questionsAsked = 0;
var questions = [{
		id: 1,
		question: "test",
		correctAnswer: "answer1",
		incorrectAnswer1: "answer2",
		incorrectAnswer2: "answer3",
		incorrectAnswer3: "answer4",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 2,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 3,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 4,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 5,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 6,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 7,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 8,
		question: "",
		correctAnswer: "",
		incorrectAnswer1: "",
		incorrectAnswer2: "",
		incorrectAnswer3: "",
		correctAnswerNarative: "",
		answerImage: "",
	}];

function startGameOnClick() {
	$("#startGame").on("click", function(event) {
		$("#startGame").addClass("hide");
		$("#startGame").off("click");
		questionLoad();
	});
}

function questionLoad() {
	$("#question").html(questions[questionsAsked].question);
	$("#answerButton1").html(questions[questionsAsked].correctAnswer);
	$("#answerButton2").html(questions[questionsAsked].incorrectAnswer1);
	$("#answerButton3").html(questions[questionsAsked].incorrectAnswer2);
	$("#answerButton4").html(questions[questionsAsked].incorrectAnswer3);
	questionTimer();
}

function questionTimer() {

}	

function potentialAnswer() {

}

function answers() {

}

function correctAnswer() {

}

function holdAnswerTimer() {

}

function gameOver() {
	$("#startGame").removeClass("hide");
}

startGameOnClick();

});