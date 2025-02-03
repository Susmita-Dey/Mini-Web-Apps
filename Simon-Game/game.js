var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keydown(function () {
  if (!started) {
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
  var userChosenColour = $(this).attr("id");

  //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  // console.log(userClickedPattern);

  animatePress(userChosenColour);

  // Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      // Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    //your code to be executed after 1 second
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
