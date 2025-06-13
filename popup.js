const popupWrapper = document.getElementById("popupWrapper");
const rulesList = document.getElementById("rulesList");
const playerNames = document.getElementById("playerNames");

function openPopup() {
  popupWrapper.style.display = "flex";
  updatePlayerFields();
}

function closePopup() {
  popupWrapper.style.display = "none";
}

function startGame() {
  const difficulty = document.querySelector("input[name='difficulty']:checked").value;
  const player1 = document.getElementById("player1").value;
  const player2 = document.getElementById("player2").value;
  const target = document.getElementById("target").value;

  if (!player1 || !player2 || !target) {
    alert("Please fill all fields.");
    return;
  }

  const gameSettings = {
    difficulty,
    player1,
    player2,
    target: parseInt(target),
  };

  localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  window.location.href = "game.html";
}
