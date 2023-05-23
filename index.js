const setup = () => {
  let totalcards = 0;
  let flippedCards = 0;
  let firstCard = null;
  let firstImg = null;
  let secondCard = null;
  let secondImg = null;
  $("#winner").empty();
  $("#difficulty").hide();

  $("#start").click(function() {
    $("#difficulty").show();
    $("#easy").show();
    $("#medium").show();
    $("#hard").show();
    $("#start").hide();
  });

  $("#reset").click(function() {
    $("#difficulty").hide();
    $("#start").show();
    $("#winner").empty();
    $("#game_grid").empty();
    flippedCards = 0;
    firstCard = null;
    firstImg = null;
    secondCard = null;
    secondImg = null;
  });

  $("#easy").click(function() {
    $("#medium").hide();
    $("#hard").hide();
    const easyTotalCards = 3;
    let cards = [];
    for (let i = 1; i <= easyTotalCards; i++) {
      cards.push(i);
      cards.push(i);
    }
    console.log(cards);
    for (let i = 1; i <= (easyTotalCards * 2); i++) {
      let random = Math.floor(Math.random() * cards.length);
      let card = cards[random];
      cards.splice(random, 1);
      console.log(card);
      $("#game_grid").append(
        `<div class="card" id="card${i}"><div class="front_face"><img src="00${card}.png"></div><div class="back_face"><img src="backface.png"></div></div>`
      );
    }
    totalcards = easyTotalCards * 2;
  });

  $("#medium").click(function() {
    $("#easy").hide();
    $("#hard").hide();
    const mediumTotalCards = 6;
    let cards = [];
    for (let i = 1; i <= mediumTotalCards; i++) {
      cards.push(i);
      cards.push(i);
    }
    console.log(cards);
    for (let i = 1; i <= (mediumTotalCards * 2); i++) {
      let random = Math.floor(Math.random() * cards.length);
      let card = cards[random];
      cards.splice(random, 1);
      console.log(card);
      $("#game_grid").append(
        `<div class="card" id="card${i}"><div class="front_face"><img src="00${card}.png"></div><div class="back_face"><img src="backface.png"></div></div>`
      );
    }
    totalcards = mediumTotalCards * 2;
  });

  $("#hard").click(function() {
    $("#easy").hide();
    $("#medium").hide();
    const hardTotalCards = 9;
    let cards = [];
    for (let i = 1; i <= hardTotalCards; i++) {
      cards.push(i);
      cards.push(i);
    }
    console.log(cards);
    for (let i = 1; i <= (hardTotalCards * 2); i++) {
      let random = Math.floor(Math.random() * cards.length);
      let card = cards[random];
      cards.splice(random, 1);
      console.log(card);
      $("#game_grid").append(
        `<div class="card" id="card${i}"><div class="front_face"><img src="00${card}.png"></div><div class="back_face"><img src="backface.png"></div></div>`
      );
    }
    totalcards = hardTotalCards * 2;
  });

  $(".card").click(function() {
    $(this).toggleClass("flip");
    if (!firstCard) {
      firstCard = this;
      console.log(firstCard);
      firstImg = $(this).find(".front_face img")[0];
      // firstCard.cardID = $(this).attr("id");
    } else {
      secondCard = this;
      console.log(secondCard);
      secondImg = $(this).find(".front_face img")[0];
      // secondCard.cardID = $(this).attr("id");
      if (firstImg.src === secondImg.src) {
        console.log("match");
        $(firstCard).off("click");
        $(secondCard).off("click");
        flippedCards += 2;
      } else {
        console.log(firstCard);
        console.log(secondCard);
        setTimeout(function() {
          console.log("no match");
          $(firstCard).toggleClass("flip");
          $(secondCard).toggleClass("flip");
        }, 1000);
      }
      firstCard = null;
      secondCard = null;
      if (flippedCards === totalcards) {
        console.log("game over");
        $("#winner").append("<h1>Winner!</h1>");
      }
    }
  });
};




$(document).ready(setup);