const setup = () => {
  let firstCard = null;
  let secondCard = null;

  $(".card").click(function() {
    $(this).toggleClass("flip");
    if (!firstCard) {
      firstCard = {};
      firstCard.img = $(this).find(".front_face")[0];
      firstCard.cardID = $(this).attr("id");
    } else {
      secondCard = {};
      secondCard.img = $(this).find(".front_face")[0];
      secondCard.cardID = $(this).attr("id");
      if (firstCard.img.src === secondCard.img.src) {
        $(firstCard).parent().off("click");
        $(secondCard).parent().off("click");
      } else {
        setTimeout(() => {
          $(`#(firstCard.cardID)`).toggleClass("flip");
          $(`#(secondCard.cardID)`).toggleClass("flip");
        }, 1000);
      }
      firstCard = null;
      secondCard = null;
    }
  });
};




$(document).ready(setup);