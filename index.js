const setup = () => {
  let isDark = false;
  let total = 0;
  let flippedCards = 0;
  let firstCard = null;
  let firstImg = null;
  let firstCardID = null;
  let secondCard = null;
  let secondImg = null;
  let secondCardID = null;
  let clicks = 0;
  let time = 0;
  let gameInterval = null;
  let matched = 0;
  let remaining = 0;
  let pairs = 0;
  $("#winner").empty();
  $("#difficulty").hide();
  $("#reset").hide();
  $("#power").hide();

  $("#theme_switch").on("click", function () {
  if (isDark) {
    $("body").removeClass("dark-theme");
    $("body").addClass("light-theme");
    isDark = false;
  } else {
    $("body").removeClass("light-theme");
    $("body").addClass("dark-theme");
    isDark = true;
  }
});

  $("#start").click(function() {
    $("#difficulty").show();
    $("#easy").show();
    $("#medium").show();
    $("#hard").show();
    $("#start").hide();
    $("#reset").show();
    $("#power").show();
  });

  $("#reset").click(function() {
    $("#difficulty").hide();
    $("#start").show();
    $("#winner").empty();
    $("#game_grid").empty();
    $("#reset").hide();
    $("#power").hide();
    flippedCards = 0;
    firstCard = null;
    firstImg = null;
    firstCardID = null;
    secondCard = null;
    secondImg = null;
    secondCardID = null;
    clicks = 0;
    time = 0;
    stopTimer();
    matched = 0;
    remaining = 0;
    pairs = 0;
    $("#pairs").text(pairs);
    $("#pairsLeft").text(remaining);
    $("#clicks").text(clicks);
    $("#time").text(time);
    gameInterval = null;
  });

  function timer() {
    gameInterval = setInterval(function() {
      time++;
      $("#time").text(time);
    }, 1000);
  }

  function stopTimer() {
    clearInterval(gameInterval);
  }

  function difficultyStart(totalCards) {
    let cards = [];
    for (let i = 1; i <= totalCards; i++) {
      cards.push(i);
      cards.push(i);
    }
    console.log(cards);
    for (let i = 1; i <= (totalCards * 2); i++) {
      let random = Math.floor(Math.random() * cards.length);
      let card = cards[random];
      cards.splice(random, 1);
      console.log(i);
      $("#game_grid").append(
        `<div class="card" id="card${i}"><div class="front_face"><img src="00${card}.png"></div><div class="back_face"><img src="backface.png"></div></div>`
      );
    }
    total = totalCards * 2;
    pairs = totalCards;
    $("#pairs").text(pairs);
    remaining = pairs - matched;
    $("#pairsLeft").text(remaining);
    timer();
  }

  $("#easy").click(function() {
    $("#medium").hide();
    $("#hard").hide();
    const easyTotalCards = 3;
    difficultyStart(easyTotalCards);
  });

  $("#medium").click(function() {
    $("#easy").hide();
    $("#hard").hide();
    const mediumTotalCards = 6;
    difficultyStart(mediumTotalCards);
  });

  $("#hard").click(function() {
    $("#easy").hide();
    $("#medium").hide();
    const hardTotalCards = 9;
    difficultyStart(hardTotalCards);
  });

  $("#power").click(function() {
    const unmatchedCards = $(".card").not(".flip").not(".match");
        unmatchedCards.addClass("flip");

        setTimeout(() => {
          unmatchedCards.removeClass("flip");
        }, 3000);
  });

  $("#game_grid").on("click", ".card", function() {
    if (firstCard && secondCard || $(this).hasClass("match") || firstCardID === $(this).attr("id")) {
      return;
    }
    $(this).toggleClass("flip");
    $("#clicks").text(clicks += 1);
    console.log(firstCard, secondCard);
    if (!firstCard) {
      firstCard = $(this);
      console.log(firstCard);
      firstImg = $(this).find(".front_face img")[0];
      firstCardID = $(this).attr("id");
    } else {
      secondCard = $(this);
      console.log(secondCard);
      secondImg = $(this).find(".front_face img")[0];
      secondCardID = $(this).attr("id");
      if (firstImg.src === secondImg.src) {
        console.log("match");
        firstCard.addClass("match");
        secondCard.addClass("match");
        flippedCards += 2;
        $("#pairsMatched").text(matched += 1);
        $("#pairsLeft").text(remaining -= 1);
        firstCard = null;
        firstImg = null;
        firstCardID = null;
        secondCard = null;
        secondImg = null;
        secondCardID = null;
      } else {
        console.log("no match");
        setTimeout(function () {
          firstCard.removeClass("flip");
          secondCard.removeClass("flip");
          firstCard = null;
          firstImg = null;
          firstCardID = null;
          secondCard = null;
          secondImg = null;
          secondCardID = null;
      }, 1000);
        console.log(firstCard);
        console.log(secondCard);
      }
      if (flippedCards === total) {
        console.log("game over");
        $("#winner").append("<h1>Winner!</h1>");
        stopTimer();
      }
    }
  });
};




$(document).ready(setup);