let right_cards = [];
let user_cards = [];
let card_number = 0;
let random_card;
let level = 3;
let i;

// assiging click events
for(i = 0; i < 4; i += 1){
    document.querySelector('.n' + i.toString()).addEventListener('click', function(){
        click_card(this.classList[1][1], 0, true);
    })
}

// light button for 1 second and keep the card clicked in memory
function click_card(index, wait = 0, user_typing){
    setTimeout(function(){
        $(".n" + index.toString()).css('backgroundColor', '#00eeee');
        makeSound(index);
    }, 1000 * wait);
    setTimeout(function(){
        $(".n" + index.toString()).css('backgroundColor', '#dddddd');
    }, 1000 * wait + 500);

    if(!user_typing){
        right_cards.push(index.toString());
    }

    if(user_typing){
        user_cards.push(index);
        card_number += 1;
        if(card_number == level){
            console.log(right_cards.join(), user_cards.join());
            if(right_cards.join() == user_cards.join()){
                end_level(true);
            }else{
                end_level(false);
            }
        }
    }
}

function bot_pick_cards(nb_cards){
    $("h2").text('Level ' + (nb_cards - 2).toString());
    for(i = 0; i < nb_cards; i +=1){
        setTimeout(function(){
            random_card = Math.floor(Math.random() * 4);
            click_card(random_card, i, false);
        }, i * 1000);
        
    }
}

function end_level(victory){
    right_cards = [];
    user_cards = [];
    card_number = 0;

    if(victory){
        $(".card").css('backgroundColor', '#00ff00');
        setTimeout(function(){
            $('.card').css('backgroundColor', '#dddddd');
        }, 1000);
        level += 1;

        if(level == 8){
            $("h1").text('You won !!! Well played :)');
            return;
        }

        bot_pick_cards(level);
    }

    else{
        $(".card").css('backgroundColor', '#ff0000');
        setTimeout(function(){
            $('.card').css('backgroundColor', '#dddddd');
        }, 1000);
        level -= 2;

        if(level < 3){
            $("h1").text('You lost... Better luck next time !');
            return;
        }

        bot_pick_cards(level);
    }
}

function makeSound(card) {

    switch (card) {
      case 0:
        let note0 = new Audio("sounds/note0.mp3");
        note0.play();
        break;

      case 1:
        let note1 = new Audio("sounds/note1.mp3");
        note1.play();
        break;

      case 2:
        let note2 = new Audio('sounds/note2.mp3');
        note2.play();
        break;

      case 3:
        let note3 = new Audio('sounds/note3.mp3');
        note3.play();
        break;
    }
  }