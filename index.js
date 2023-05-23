const setup = () => {
  let firstCard = null;
  let secondCard = null;

  $(".card").click(function() {
    $(this).toggleClass("flip");
    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else {
      secondCard = $(this).find(".front_face")[0];
      if (firstCard.src === secondCard.src) {
        $(firstCard).parent().off("click");
        $(secondCard).parent().off("click");
      } else {
        setTimeout(() => {
          $(firstCard).parent().toggleClass("flip");
          $(secondCard).parent().toggleClass("flip");
        }, 1000);
      }
      firstCard = null;
      secondCard = null;
    }
  });
};




$(document).ready(setup);