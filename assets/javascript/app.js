$(document).ready(function(){
var correctAnswers = 0;
var incorrectAnswers = 0;
var unAnswered = 0;
var questionsAsked = 0;
var intervalId;
var clockRunning = false;
var questions = [{
		id: 0,
		question: "test",
		answer1: "answer1",
		answer2: "answer2",
		answer3: "answer3",
		answer4: "answer4",
		correctAnswer: 3,
		correctAnswerNarative: "blah blah blah blah",
		answerImage: "assets/images/luke.jfif",
		},
		{
		id: 1,
		question: "test 2",
		answer1: "answer1",
		answer2: "answer2",
		answer3: "answer3",
		answer4: "answer4",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 2,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 3,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 4,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 5,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 6,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
		},
		{
		id: 7,
		question: "",
		answer1: "",
		answer2: "",
		answer3: "",
		answer4: "",
		correctAnswer: 3,
		correctAnswerNarative: "",
		answerImage: "",
	}];

//console.log("Correct Answer: " + questions[0].correctAnswer)

var questionTimer = {
	
	time: 0,

	reset: function() {
		questionTimer.time = 0;
		$("#questionTimer").html("00:00");
	},

	start: function() {
		if (!clockRunning) {
			intervalId = setInterval(questionTimer.duration, 1000);
			clockRunning = true;
		}
	},

	stop: function() {
			clearInterval(intervalId);
			console.log("stop function hit");
			clockRunning = false;
	},

	count: function() {
			questionTimer.time++;
			console.log("Time: " + questionTimer.time);
			var converted = questionTimer.timeConverter(questionTimer.time);
			$("#questionTimer").html(converted);	
	},

	duration: function() {
		if (questionTimer.time < 3) {
			questionTimer.count();
		}

		else {
			questionTimer.stop();
			answers();
			unAnswered++;
			offClickAndHide();
			$("#question").html("Bummer, you ran out of time!");
		}
	},

	timeConverter: function(t) {
		var minutes = Math.floor(t / 60);
    	var seconds = t - (minutes * 60);

	    if (seconds < 10) {
	      seconds = "0" + seconds;
	    }

	    if (minutes === 0) {
	      minutes = "00";
	    }
	    else if (minutes < 10) {
	      minutes = "0" + minutes;
	    }

	    return minutes + ":" + seconds;
	}
};	

function startGameOnClick() {
	$("#startGame").on("click", function(event) {
		$("#startGame").addClass("hide");
		$("#startGame").off("click");
		$("#questionRow").removeClass("hide");
		$("#playContentRow").removeClass("hide");
		$("#timerResultsRow").removeClass("hide");
		questionLoad();
	});
}

function questionLoad() {
	$("#question").html(questions[questionsAsked].question);
	$("#answerButton1").html(questions[questionsAsked].answer1);
	$("#answerButton2").html(questions[questionsAsked].answer2);
	$("#answerButton3").html(questions[questionsAsked].answer3);
	$("#answerButton4").html(questions[questionsAsked].answer4);
	questionTimer.start();
	potentialAnswer();
	questionsAsked++;
	console.log("Questions Asked: " + questionsAsked);
}

function potentialAnswer() {
	$("#answerButton1").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton2").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton3").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton4").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
}

function offClickAndHide() {
	$("#answerButton1").addClass("hide");
	$("#answerButton1").off("click");
	$("#answerButton2").addClass("hide");
	$("#answerButton2").off("click");
	$("#answerButton3").addClass("hide");
	$("#answerButton3").off("click");
	$("#answerButton4").addClass("hide");
	$("#answerButton4").off("click");
}

function unhide() {
	$("#answerButton1").removeClass("hide");
	$("#answerButton2").removeClass("hide");
	$("#answerButton3").removeClass("hide");
	$("#answerButton4").removeClass("hide");
}


function answers(lastChar) {
	var y = parseInt(lastChar);
	if (questions[questionsAsked -1].correctAnswer === y) {
		$("#question").html("You are right!");
		correctAnswers++;
		correctAnswer();
	}
	else {
		$("#question").html("Sorry, you are wrong!");
		incorrectAnswers++;
		correctAnswer(y);
	}
}

function correctAnswer(lastChar) {

	var newDiv = $("<div></div>");
	newDiv.attr("id", "narative");
	$("#potentialAnswer1-2Row").append(newDiv);

	var newImg = $("<img>");
	newImg.attr("id", "image");
	$("#potentialAnswer3-4Row").append(newImg);

	$("#narative").text("Correct Answer: " + questions[questionsAsked -1].correctAnswerNarative);
	$("#image").attr("src", questions[questionsAsked -1].answerImage);

	holdAnswerTimer();
}

function holdAnswerTimer() {
	if (questionsAsked === 8) {
		setTimeout(gameOver, 1000 * 2);
	}
	else {
		setTimeout(nextQuestion, 1000 * 1);
	}
}

function nextQuestion() {
	$("#narative").html("");
	$("#image").attr("src", "");
	unhide();
	questionTimer.reset();
	questionLoad();
}

function gameOver() {
	$("#narative").html("");
	$("#image").attr("src", "");

	var newDiv1 = $("<div></div>");
	newDiv1.attr("id", "correct");
	newDiv1.addClass("alert alert-success");
	$("#potentialAnswer1-2Row").append(newDiv1);

	var newDiv2 = $("<div></div>");
	newDiv2.attr("id", "incorrect");
	newDiv2.addClass("alert alert-info");
	$("#potentialAnswer1-2Row").append(newDiv2);

	var newDiv3 = $("<div></div>");
	newDiv3.attr("id", "unanswered");
	newDiv3.addClass("alert alert-danger");
	$("#potentialAnswer1-2Row").append(newDiv3);

	$("#question").html("Results");
	$("#correct").text("Correct Answers: " + correctAnswers);
	$("#incorrect").text("Incorrect Answers: " + incorrectAnswers);
	$("#unanswered").text("Unanswered Questions: " + unAnswered);

	setTimeout(restartGame, 1000 * 2);
}

function restartGame() {
	correctAnswers = 0;
	incorrectAnswers = 0;
	unAnswered = 0;
	questionsAsked = 0;
	intervalId = "";
	$("#correct").text("");
	$("#incorrect").text("");
	$("#unanswered").text("");
	$("#correct").removeClass("alert alert-danger");
	$("#incorrect").removeClass("alert alert-danger");
	$("#unanswered").removeClass("alert alert-danger");
	$("#questionRow").addClass("hide");
	$("#playContentRow").addClass("hide");
	$("#timerResultsRow").addClass("hide");
	//unhide();
	questionTimer.reset();
	$("#startGame").removeClass("hide");
	startGameOnClick();
}

questionTimer.reset();
startGameOnClick();

});