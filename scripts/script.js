'use strict';

const dice = document.querySelector('.dice');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const new_game = document.querySelector('.btn--new');

let score, currentscore, activePlayer;
let playing; // this is state variable used to store state of game/system etc... ki pta lgge game win ke badd hi kheli toh nhi ja rhi 

const init = function(){
    score = [0,0];
    currentscore = 0;
    activePlayer=0;
    playing=true;

    document.querySelector(`#current--0`).textContent = currentscore;
    document.querySelector(`#current--1`).textContent = currentscore;    
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;


    dice.classList.add('hidden');
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active'); // if already present on it then no worry 
    
}

init();


/// function to switch player 
const switchplayer = function(){
// Manually add and remove 
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    // if (activePlayer === 0) {
    //   activePlayer = 1;
    // } else { // else if activePlayer==1
    //   activePlayer = 0;
    // }
    // document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
    
// Let toggle do it 
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active'); // player 0 ki remove as it would be added 
    if (activePlayer === 0) {
      activePlayer = 1;
    } else { // else if activePlayer==1
      activePlayer = 0;
    }    
    document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active'); // player 1 ko add as it was not there
}





/// function for roll 
  currentscore = 0;
  const random_no = function () {
  if(playing){
    const x = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `styles/images/dice-${x}.png`;

    if (x !== 1) {
      currentscore += x;
      document.getElementById(`current--${activePlayer}`).textContent = currentscore;
    } else { // x=== 1
      currentscore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentscore;
      switchplayer();

      return;
    }
  }  
};

roll.addEventListener('click', random_no); // u can type function here directly







//////////////////////// function for hold ///////////////////////////
// function for hold using paresInt
// let score = 0;
// const stop = function () {
//   score = parseInt(document.getElementById(`score--${activePlayer}`).textContent,10) + currentscore;
//   document.getElementById(`score--${activePlayer}`).textContent = score;
//   currentscore = 0;

//   if (document.querySelector(`#score--${0}`).textContent >= 25) {
//     console.log('I reached here');
//     document.querySelector('body').style.backgroundColor = 'purple';
//     return;
//   }

//   console.log('continue');
//   document.getElementById(`current--${activePlayer}`).textContent = currentscore;
//   switchplayer();
// };
// hold.addEventListener('click', stop);

// function for hold using arrays
score = [0,0];
const stop = function () {
  if(playing){
    score[`${activePlayer}`] += currentscore;
  document.getElementById(`score--${activePlayer}`).textContent = score[`${activePlayer}`];
  currentscore=0; // make it zero but not display at currentscore bcs last kitna add hone pr win kiya yeh current score mein display rhenedo 
  if (score[activePlayer] >= 50) {
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    dice.classList.add('hidden');
    playing=false;
    
    // In order that it not switches te player after plating 
    // we can either return or put switch in else block 
    // return;
  }
  else{
    document.querySelector(`#current--${activePlayer}`).textContent = currentscore; // Agar nhi win kiya toh else mein aakr 0 diply 
    switchplayer();                                                                 // vrna jitne prr win kiya vo display hoga   
  }                                                                                 // bcs last kitna add hone pr win kiya yeh current score mein display rhenedo 
  }
};
hold.addEventListener('click', stop);
//////////////////////// function for hold ///////////////////////////




/// function for new Game

new_game.addEventListener('click', init);





