// This project is my submission of the 'Boss Level Challenge 2 - The Simon Game' from Udemy course by Angela Yu


var start = false;

$(document).keypress(function() {
    if (!start) {
      $("#level-title").text("Level " + level);
      nextSequence();
      start = true;
    }
  });


var level = 1;

var gamePattern = [];

var userClickedPattern = [];

// Create a new array called buttonColors
var buttonColors = ["red", "blue", "green", "yellow"];

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");

    
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColor);
    animatePress(userChosenColor);
   
});


/*Create a function called nextSequence()
and generate a random number between 0 and 3.
*/
function nextSequence() {

    userClickedPattern = [];
    
    $("h1").text("Level " + level++);
    
    var randomNumber = Math.floor(Math.random() * 4);

/*Create a new variable called
randomChosenColor and use the 
randomNumber to select a random color 
from the buttonColors array.
*/
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

//Animate a flash to the button 
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
//Play sound for the button selected
    

}

function playSound (name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

//Animate the pressed button by adding a removing a class
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function checkAnswer (currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length){
            setTimeout(nextSequence, 1000);
        }    
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    gamePattern = [];
    level = 1;
    start = false;
}