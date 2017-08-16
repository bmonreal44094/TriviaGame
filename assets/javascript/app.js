$(document).ready(function(){
var correctAnswers = 0;
var incorrectAnswers = 0;
var unAnswered = 0;
var questionsAsked = 0;
var intervalId;
var clockRunning = false;
var questions = [{
		id: 0,
		question: "What is the circumference of the earth in miles?",
		answer1: "4,872",
		answer2: "21,303",
		answer3: "24,901",
		answer4: "2,853",
		correctAnswer: 3,
		correctAnswerNarative: "The circumference of the earth in miles is 24,901.",
		answerImage: "assets/images/earth.jfif",
		},
		{
		id: 1,
		question: "How old do scientist believe the earth is?",
		answer1: "4.6 Billion Years",
		answer2: "2.6 Million Years",
		answer3: "5,000 Years",
		answer4: "2.6 Billion Years",
		correctAnswer: 1,
		correctAnswerNarative: "The earth is believed to be 4.6 Billion Years old!",
		answerImage: "assets/images/earth.jfif",
		},
		{
		id: 2,
		question: "The observable universe is estimated to contain how many galaxies:",
		answer1: "6 to 18 Trillion",
		answer2: "10 to 20 Million",
		answer3: "200 Billion to 1 Trillion",
		answer4: "7,000 to 45,000",
		correctAnswer: 3,
		correctAnswerNarative: "The observable universe is estimated to contain 200 Billion to 1 Trillion galaxies!",
		answerImage: "assets/images/cosmicWeb.jpg",
		},
		{
		id: 3,
		question: "The Milky Way contains how many stars?",
		answer1: "200,000 to 560,000",
		answer2: "200 to 400 Billion",
		answer3: "6,000 to 16,000",
		answer4: "1 to 3 Trillion",
		correctAnswer: 2,
		correctAnswerNarative: "The Milky Way contains 200 to 400 Billion stars!",
		answerImage: "assets/images/via_lactea0.jpg",
		},
		{
		id: 4,
		question: "The speed of light is?",
		answer1: "299,792,458 meters/second",
		answer2: "299,792,458 feet/second",
		answer3: "299,792,458 miles/day",
		answer4: "299,792,458 inches/year",
		correctAnswer: 1,
		correctAnswerNarative: "The speed of light is 299,792,458 meters/second",
		answerImage: "assets/images/faster-than-the-speed-of-light.jpg",
		},
		{
		id: 5,
		question: "The distance from earth to moon is?",
		answer1: "1 Million Miles",
		answer2: "3,945 Miles",
		answer3: "452,900 Miles",
		answer4: "238,900 Miles",
		correctAnswer: 4,
		correctAnswerNarative: "The distance from earth to moon is 238,900 Miles",
		answerImage: "assets/images/earth_and_moon.png",
		},
		{
		id: 6,
		question: "The circumference of the moon is?",
		answer1: "6,786 Miles",
		answer2: "2,399 Miles",
		answer3: "20,150 Miles",
		answer4: "46 Miles",
		correctAnswer: 3,
		correctAnswerNarative: "The circumference of the moon is 6,786 Miles",
		answerImage: "assets/images/our_closest_mainimage.jpg",
		},
		{
		id: 7,
		question: "The last planet in our solar system is?",
		answer1: "Pluto",
		answer2: "Neptune",
		answer3: "Uranis",
		answer4: "Jupiter",
		correctAnswer: 2,
		correctAnswerNarative: "The last planet in our solar system is Neptune",
		answerImage: "assets/images/442079-neptune.jpg",
	}];

var offClickAndHide = function() {
	$("#answerButton1").addClass("hide");
	$("#answerButton1").off("click");
	$("#answerButton2").addClass("hide");
	$("#answerButton2").off("click");
	$("#answerButton3").addClass("hide");
	$("#answerButton3").off("click");
	$("#answerButton4").addClass("hide");
	$("#answerButton4").off("click");
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

var questionLoad = function() {
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

var startGameOnClick = function() {
	$("#startGame").on("click", function(event) {
		$("#startGame").addClass("hide");
		$("#startGame").off("click");
		$("#questionRow").removeClass("hide");
		$("#playContentRow").removeClass("hide");
		$("#timerResultsRow").removeClass("hide");
		questionLoad();
	});
}

var correctAnswer = function(lastChar) {

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


var answers = function(lastChar) {
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

var potentialAnswer = function() {
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

var unhide = function() {
	$("#answerButton1").removeClass("hide");
	$("#answerButton2").removeClass("hide");
	$("#answerButton3").removeClass("hide");
	$("#answerButton4").removeClass("hide");
}

var holdAnswerTimer = function() {
	if (questionsAsked === 8) {
		setTimeout(gameOver, 1000 * 5);
	}
	else {
		setTimeout(nextQuestion, 1000 * 5);
	}
}

var removeNarativeAndImage = function() {
	var parent0 = document.getElementById("potentialAnswer3-4Row");
	var child0 = document.getElementById("image");
	var parent1 = document.getElementById("potentialAnswer1-2Row");
	var child1 = document.getElementById("narative");
	parent0.removeChild(child0);
	parent1.removeChild(child1);
}

var nextQuestion = function() {
	removeNarativeAndImage();
	unhide();
	questionTimer.reset();
	questionLoad();
}

var gameOver = function() {
	removeNarativeAndImage();

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

	setTimeout(restartGame, 1000 * 5);
}

var restartGame = function() {
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