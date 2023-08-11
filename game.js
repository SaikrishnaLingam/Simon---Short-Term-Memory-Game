var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    pressButtonAnimation(randomChosenColor);
    playSound(randomChosenColor);
    $("h1").text("Level " + level);
    level++;

}

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    pressButtonAnimation(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);

});
function checkAnswer(currentLevel) {


    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        // console.log("success");


        if (userClickedPattern.length === gamePattern.length) {

            console.log("success");
            console.log(userClickedPattern);
            console.log(gamePattern);
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");
        console.log(userClickedPattern);
        console.log(gamePattern);
        $("h1").text("GAME OVER! PRESS ANY KEY TO RESTART");
        $("body").addClass("game-over");
        setTimeout(function () {
            var audiosound = new Audio("sounds/wrong.mp3");
            audiosound.play();
            $("body").removeClass("game-over");
        }, 100);
        $(document).keydown(function () {
            startOver();
            if (startGame === true) {
                nextSequence();
                startGame = false;
            }

        })

    }

}
function playSound(randomChosenColor) {
    var green = new Audio("sounds/green.mp3");
    var red = new Audio("sounds/red.mp3");
    var yellow = new Audio("sounds/yellow.mp3");
    var blue = new Audio("sounds/blue.mp3");
    if (randomChosenColor === "green") {
        green.play();
    } else if (randomChosenColor === "red") {
        red.play();
    } else if (randomChosenColor === "yellow") {
        yellow.play();
    } else if (randomChosenColor === "blue") {
        blue.play();
    }
}
function pressButtonAnimation(chosenColor) {
    $("#" + chosenColor).addClass("pressed");
    setTimeout(function () {
        $("#" + chosenColor).removeClass("pressed");
    }, 100);
}

var startGame = true;
$(document).keydown(function () {
    if (startGame === true) {
        nextSequence();
        startGame = false;
    }

}
);
function startOver() {
    level = 0;
    gamePattern = [];
    startGame = true;
}