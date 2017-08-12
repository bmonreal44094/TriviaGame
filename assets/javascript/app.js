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
		if (questionTimer.time < 30) {
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

function potentialAnswer() {
	$("#answerButton1").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		console.log("lastChar " + lastChar);
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton2").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		console.log("lastChar " + lastChar);
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton3").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		console.log("lastChar " + lastChar);
		questionTimer.stop();
		answers(lastChar);
		offClickAndHide();
	});
	$("#answerButton4").on("click", function(event) {
		var lastChar = event.target.id[event.target.id.length -1];
		console.log("lastChar " + lastChar);
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
	//console.log("lastChar: " + lastChar);
	//console.log("Answers Hit!")
	//console.log(questions[questionsAsked -1].correctAnswer);
}

function correctAnswer(lastChar) {
	console.log("Correct Answer Hit!");
	$("#potentialAnswer1-2Row").html("<div>Correct Answer: " + questions[questionsAsked -1].correctAnswerNarative + "</div>");
	$("#potentialAnswer3-4Row").html("<img src=" + questions[questionsAsked -1].answerImage + ">");
	console.log("<img src=" + questions[questionsAsked -1].answerImage);
	console.log("Correct Answer:" + questions[questionsAsked -1].correctAnswerNarative);
	holdAnswerTimer();
}

function holdAnswerTimer() {
	if (questionsAsked === 8) {
		setTimeout(gameOver, 1000 * 5);
	}
	else {
		setTimeout(nextQuestion, 1000 * 5);
	}
}

function nextQuestion() {
	//$("#startGame").removeClass("hide");
	//$("#questionRow").addClass("hide");
	//$("#playContentRow").removeClass("hide");
	//$("#timerResultsRow").addClass("hide");
	$("#potentialAnswer1-2Row").html("");
	$("#potentialAnswer3-4Row").html("");
	unhide();
	questionTimer.reset();
	questionLoad();
	
}

function gameOver() {
	//display results
	startGameOnClick();
}

//$("#questionRow").addClass("hide"); //Remove later
//$("#playContentRow").addClass("hide"); //Remove later
$("#timerResultsRow").addClass("hide"); //Remove later

//gameBegin();
questionTimer.reset();
startGameOnClick();

});