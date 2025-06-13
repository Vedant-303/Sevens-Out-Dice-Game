const settings = JSON.parse(localStorage.getItem("gameSettings"));

document.addEventListener("DOMContentLoaded", () => {

  if (!settings) {
    alert("No game settings found. Redirecting to home...");
    window.location.href = "index.html";
    return;
  }

  const player1Element = document.querySelector(".player1 .playerName");
  const player2Element = document.querySelector(".player2 .playerName");
  const targetElement = document.querySelector(".targetNumber");

  if (player1Element) player1Element.textContent = settings.player1;
  if (player2Element) player2Element.textContent = settings.player2;
  if (targetElement) targetElement.textContent = settings.target;
});

const player1Button = document.querySelector(".playerButton");
const player2Button = document.querySelector(".player2Button");
let p1Score = document.querySelector(".player1Score");
let p2Score = document.querySelector(".player2Score");

player2Button.disabled = true;

let player1Score = 0;
let player2Score = 0;

const isComputer = settings.player2.toLowerCase() === "computer";

function rollDice() {
  const val1 = Math.floor(Math.random() * 6) + 1;
  const val2 = Math.floor(Math.random() * 6) + 1;

  rotateDice("dice1", val1);
  rotateDice("dice2", val2);

  let score = val1 + val2;
  const sameDice = val1 === val2;

  const gameMode = settings.difficulty || "easy";
  const targetScore = parseInt(
    document.querySelector(".targetNumber").textContent
  );

  const isPlayer1Turn = !player1Button.disabled;

  setTimeout(() => {
    if (isPlayer1Turn) {
      if (score === 7) {
        if (gameMode === "hard") player1Score = 0;
        player1Button.disabled = true;
        player2Button.disabled = false;
      } else {
        if (sameDice) score *= 2;
        player1Score += score;
      }

      p1Score.textContent = String(player1Score).padStart(2, "0");

      checkWinner();
    } else {
      if (score === 7) {
        if (gameMode === "hard") player2Score = 0;
        player2Button.disabled = true;
        player1Button.disabled = false;
      } else {
        if (sameDice) score *= 2;
        player2Score += score;
      }
    }

    p2Score.textContent = String(player2Score).padStart(2, "0");

    checkWinner();
  }, 1000);
}

function rotateDice(diceId, value) {
  const dice = document.getElementById(diceId);

  const faceRotations = {
    1: "rotateX(0deg) rotateY(0deg)",
    2: "rotateX(0deg) rotateY(90deg)",
    3: "rotateX(90deg) rotateY(0deg)",
    4: "rotateX(-90deg) rotateY(0deg)",
    5: "rotateX(0deg) rotateY(-90deg)",
    6: "rotateX(180deg) rotateY(0deg)",
  };

  dice.style.transition = "transform 1s ease";
  const baseRotation = "rotateY(0deg) rotateX(45deg) rotateZ(30deg)";
  const randomX = Math.floor(Math.random() * 4) * 360;
  const randomY = Math.floor(Math.random() * 4) * 360;

  dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) ${baseRotation} ${faceRotations[value]}`;
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  p1Score.textContent = "00";
  p2Score.textContent = "00";
  player1Button.disabled = false;
  player2Button.disabled = true;
  const winScreen = document.querySelector(".winner");
  winScreen.classList.remove("visible");
}

function goHome() {
  window.location.href = "index.html";
}

let checkWinner = () => {
  const player1Name = settings.player1;
  const player2Name = settings.player2;
  const targetValue = settings.target;
  let p1S = document.querySelector(".player1Score").innerText;
  let p2S = document.querySelector(".player2Score").innerText;

  target = Number(targetValue);
  p1S = Number(p1S);
  p2S = Number(p2S);

  let winScreen = document.querySelector(".winner");
  let winnerName = document.querySelector(".winnerName");

  if (p1S >= target) {
    winnerName.innerText = player1Name;
    winScreen.classList.add("visible");
  }
  if (p2S >= target) {
    winnerName.innerText = player2Name;
    winScreen.classList.add("visible");
  }
};

let info = "hidden";

function showInfo() {
  let infoBox = document.querySelector(".rulesPopup");

  if (info == "hidden") {
    infoBox.style.visibility = "visible";
    info = "visible";
  } else {
    infoBox.style.visibility = "hidden";
    info = "hidden";
  }
}

const rulesList = document.querySelector(".rulesList");
const difficulty = settings.difficulty;

rulesList.innerHTML =
  difficulty === "easy"
    ? `
    <li>Players take turns rolling two dice to score points.</li>
    <li>Keep rolling until you get a total of 7.</li>
    <li>Add up the dice if it's not 7 and add that to your overall score.</li>
    <li>If you roll a 7, your turn ends, and control is passed to second player.</li>
    <li>If another player roll a 7, control comes back to you.</li>
    <li>Roll a double (both dice show the same number), and you get double the points.</li>
    <li>Example: Roll double 5 (5, 5), and you get 20 points.</li>
    <li>The game goes on until one player reaches the target score.</li>`
    : `
    <li>Players take turns rolling two dice to score points.</li>
    <li>Keep rolling until you get a total of 7.</li>
    <li>Add up the dice if it's not 7 and add that to your overall score.</li>
    <li>If you roll a 7, your turn ends, and control is passed to second player.</li>
    <li>And your Score is reset to 0.</li>
    <li>If another player roll a 7, control comes back to you. And his score is rest to 0.</li>
    <li>Roll a double (both dice show the same number), and you get double the points.</li>
    <li>Example: Roll double 5 (5, 5), and you get 20 points.</li>
    <li>The game goes on until one player reaches the target score.</li>`;
