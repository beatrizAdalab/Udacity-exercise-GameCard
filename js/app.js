/*
 * Create a list that holds all of your cards
 */
let allCards = document.querySelectorAll(".deck li");
let srcCards = ["img/pokemon1.png", "img/pokemon1.png", "img/pokemon2.png", "img/pokemon2.png", "img/pokemon3.png", "img/pokemon3.png", "img/pokemon4.png", "img/pokemon4.png", "img/pokemon5.png", "img/pokemon5.png", "img/pokemon6.png", "img/pokemon6.png", "img/pokemon7.png", "img/pokemon7.png", "img/pokemon8.png", "img/pokemon8.png"];
let images = document.querySelectorAll(".deck li img");


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Cards Shuffle

function mixCards(){
   shuffle(srcCards);
   for (let i =0; i<allCards.length; i++){
     images[i].removeAttribute("src");
     images[i].setAttribute("src", srcCards[i]);
   };return images;
};

mixCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//values timeout
let min = 0;
let sec = 0;
let hours = 0;
let Stop = 0;

//Start
function ready() {
  $("button").one("click",function(){
    game();
    setInterval(function() {
        if (Stop !== 1) {
            sec++;
            if (sec === 60) {
                min++;
                sec = 0;
            }
            if (min === 60) {
                hours++;
                min = 0;
                sec = 0;
            }
            $('.timer').html(hours + ':' + min + ':' + sec);
        }
    }, 1000);}
  );
};

window.onload=ready();

//Game

 let openCards = [];
 let moves = 0;
 let stars = 0;


 // If one Card is clicked

function game (){
  $( ".card" ).on( "click", function() {
    $( this ).addClass("open");
    openCards.push( $( this ));
    puntua();
    allAction();
    complete();
  });
};


function allAction(){
  //value src 1 img open
  function open0 (){
    const Array = [... document.querySelectorAll (".open")];
    return Array[0];
  };

  let cero = open0();
  let src0 = cero.firstElementChild.getAttribute("src");

  //value src 2 img open
  function open1 (){
    const Array = [... document.querySelectorAll (".open")];
    return Array[1];
  };

  let first = open1();
  let src1 = first.firstElementChild.getAttribute("src");

  if (openCards!==0){ //Its the 2

    if(src0!==src1){//Different
      setTimeout(function(){
        $(".open").attr("class","card" );},1200);
        openCards=[];}
    else{ //Identical
      $(".open").attr("class","card show macht animated pulse" );
      openCards=[];};
    }

  else{};//Its the first Card
};



//Moves and stars
function puntua (){
  if (openCards.length==2){ //Its the 2
    moves++;};
  if (moves === 16) {
  }
  else if (moves > 16 && moves <= 34) {
    $('section ul li').hide();
    $('section ul').append('<li><i class="fa fa-star"></i></li>');
    $('section ul').append('<li><i class="fa fa-star"></i></li>');
    stars = 2;
  }
  else if (moves > 35) {
    $('section ul li').hide();
    $('section ul').append('<li><i class="fa fa-star"></i></li>');
    stars = 1;
  };
  $('.moves').html(moves);
};

 // Completed

function complete(){
  if($(".macht").length===16){
    swal({
      title: "You are a Pokemon master!",
      text: "You have " + stars + " stars, "+ moves + " moves and Time taken is " + hours + ' Hours ' + min + ' Minutes and ' + sec + ' Seconds.',
      icon: "success",
      button: "Back!",
      });

    Stop = 1;
    $('.timer').hide();
    $('.timer').html('0:0:0');
    $('.timer').show();
  };
};

// Restart
$('.button2').on('click', function() {
    location.reload();
});
