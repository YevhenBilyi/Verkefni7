/**
 * Skæri, blað, steinn.
 * Spilað gegnum console.
 */

/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Global breyta sem heldur utan um heildar sigra */
let wins = 0;

/** Global breyta sem heldur utan um heildar töp */
let losses = 0;

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf) {
  // TODO útfæra
  if(bestOf>MAX_BEST_OF || bestOf<1 || bestOf % 2 == 0){
    console.error("Invalid value");
    return false;
  }
  
  else return true;
}
console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

function playAsText(play) {
  // TODO útfæra
  if(play=='1') return 'Skæri';
  if(play=='2') return 'Blað';
  if(play=='3') return 'Steinn';
  return 'Óþekkt';
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // TODO útfæra
  
  if(player == 1 && computer == 2 || player == 2 && computer == 3 || player == 3 && computer == 1) return 1;
  if(player == computer) return 0;
  if(player == 2 && computer == 1||player == 3 && computer == 2 || player == 1 && computer == 3) return -1;
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar einn leik.
 * @return {boolean} -1 ef tölva vann, 0 ef jafntefli, 1 ef 
 */
function round() {
  // TODO útfæra
  
  // 1. Spyrja um hvað spilað, ef cancel, hætta
  let answer = prompt("Skæri, blað eða steinn?");
  if(answer === null) return;

  // 2. Ef ógilt, tölva vinnur
  if(answer !=1 && answer != 2 && answer != 3){
    console.log("Tölva vann");
    return -1;
  } 
  // 3. Velja gildi fyrir tölvu með `Math.floor(Math.random() * 3) + 1` sem skilar heiltölu á [1, 3]
  let computer = Math.floor(Math.random() * 3 ) + 1;
  // 4. Nota `checkGame()` til að finna hver vann
  let winner = checkGame(answer,computer);
  // 5. Birta hver vann
  if(winner == 1)console.log("Spilari vann umferð");
  if(winner == 0)console.log("jafntefli");
  if(winner == -1)console.log("Tölva vann umferð");
  // 6. Skila hver vann
  return winner;
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Spilar leik og bætir útkomu (sigur eða tap) við í viðeigandi global breytu.
 */
let totalGames = 0;
let totalWins = 0;
function play() {
  // TODO útfæra
  // 1. Spyrja um fjölda leikja
  let gameCount = prompt("Hversu marga leiki viltu spila?");
  // 2. Staðfesta að fjöldi leikja sé gilt gildi
  if(isValidBestOf(gameCount)){
    totalGames++;
    let computer = 0;
    let player = 0;
    let halfRounds = parseInt(gameCount)/2;
    while(computer < halfRounds && player < halfRounds){
      console.log("computer" + computer + "player:" +player + "gamecount/2:" + halfRounds);
      let winner = round();
      if(winner == -1) computer++;
      if(winner == 1) player++;
    }
    if(computer > player) console.log("Tölva vann");
    if(computer < player){
      totalWins++;
      console.log("Spilari vann");
    } 
  }
  else return;
  // 3. Keyra fjölda leikja og spila umferð þar til sigurvegari er krýndur
  // 4. Birta hvort spilari eða tölva vann
}
// Hér getum við ekki skrifað test þar sem fallið mun biðja notanda um inntak!

/**
 * Birtir stöðu spilara.
 */
function games() {
  // TODO útfæra
  console.log("Þú hefur spilað " + totalGames + " leiki.");
  console.log("Þú hefur unnið " + (totalWins / totalGames * 100).toFixed(2) + "% af heild.");
  console.log("Þú hefur tapað " + (100 - totalWins / totalGames * 100).toFixed(2) + "% af heild.");
}
// Hér getum við ekki skrifað test þar sem fallið les úr global state
