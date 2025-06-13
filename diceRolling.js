function rollDice() {
  let rollSound = new Audio("./Sounds/dice.mp3");
  rollSound.play();

  const val1 = Math.floor(Math.random() * 6) + 1;
  const val2 = Math.floor(Math.random() * 6) + 1;

  rotateDice("dice1", val1);
  rotateDice("dice2", val2);
}

function rotateDice(diceId, value) {
  const dice = document.getElementById(diceId);

  const faceRotations = {
    1: "rotateX(0deg) rotateY(0deg)",
    2: "rotateX(-90deg) rotateY(0deg)",
    3: "rotateX(0deg) rotateY(90deg)",
    4: "rotateX(0deg) rotateY(-90deg)",
    5: "rotateX(90deg) rotateY(0deg)",
    6: "rotateX(180deg) rotateY(0deg)",
  };

  dice.style.transition = "transform 1s ease";

  const baseRotation = "rotateY(0deg) rotateX(45deg) rotateZ(30deg)";
  const randomX = Math.floor(Math.random() * 4) * 360;
  const randomY = Math.floor(Math.random() * 4) * 360;

  dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg) ${baseRotation} ${faceRotations[value]}`;
}
