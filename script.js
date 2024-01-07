// code for displaying info

let info = "hidden";

let showInfo = () => {
    let infoBox = document.getElementsByClassName("howToPlay")[0];

    if (info == "hidden") {
        infoBox.style.visibility = "visible";
        info = "visible";
    }

    else {
        infoBox.style.visibility = "hidden";
        info = "hidden";
    }
}

// code for displaying settings

let setting = "hidden";

let showSetting = () => {
    let infoBox = document.getElementsByClassName("setting")[0];

    if (setting == "hidden") {
        infoBox.style.visibility = "visible";
        setting = "visible";
    }

    else {
        infoBox.style.visibility = "hidden";
        setting = "hidden";
    }
}

// code for changing middle content

let changeContent = () => {

    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    let target = document.getElementById("smallInput").value;

    if (player1Name == '' || player2Name == '') {
        alert("Name cannot be empty!");
    }

    else if (target == '' || target <= "0") {
        alert("Enter valid target value. (Greater than 0)")
    }

    else {
        let replace = document.getElementsByClassName("replace")[0];
        replace.innerHTML = '<div class="Container"> <div class="board1"> <div class="content1"> <h4 id="p1Name">Player 1</h4> <h1 id="p1Score">00</h1> </div> </div> <div class="dice"> <img id="dice1" src="./Images/6.png" alt=""> </div> <div class="dice"> <img id="dice2" src="./Images/4.png" alt=""> </div> <div class="board2"> <div class="content2"> <h4 id="p2Name">Player 2</h4> <h1 id="p2Score">00</h1> </div>  </div> </div> <div class="progress"> <progress id="progress1" value="0" max="100">10%</progress> <div class="target"> <p id="tar">173</p> </div> <progress id="progress2" class="flip" value="0" max="100">10%</progress> </div> <div class="buttons"> <button id="button1" onclick="roll()">Roll</button> <button id="button2" onclick="roll()">Roll</button> </div>'

        let p1 = document.getElementById("p1Name");
        p1.innerText = player1Name;
        let p2 = document.getElementById("p2Name");
        p2.innerText = player2Name;
        let tar = document.getElementById("tar");
        tar.innerText = target;

        let button2 = document.getElementById("button2");
        button2.disabled = true;

        target = Number(target);
        let progress1 = document.getElementById("progress1");
        let progress2 = document.getElementById("progress2");
        progress1.setAttribute('max',target);
        progress2.setAttribute('max',target);
    }
    
}

let player1Score = 0;
let player2Score = 0;

let roll = () => {

    let dice1 = document.getElementById("dice1");
    let dice2 = document.getElementById("dice2");
    let rand1 = parseInt(Math.random() * 6 + 1);
    let rand2 = parseInt(Math.random() * 6 + 1);
    let source1 = "./Images/" + rand1 + ".png";
    let source2 = "./Images/" + rand2 + ".png";
    dice1.setAttribute("src", source1);
    dice2.setAttribute("src", source2);

    dice1.setAttribute("style", 'animation: shake 0.2s ease-out 1;');
    dice2.setAttribute("style", 'animation: shake 0.2s ease-out 1;');

    let orien1 = parseInt(Math.random() * 360);
    let orien2 = parseInt(Math.random() * 360);

    let dice1Orien = document.getElementById("dice1");
    dice1Orien.style.transform = `rotateZ(${orien1}deg)`;
    let dice2Orien = document.getElementById("dice2");
    dice2Orien.style.transform = `rotateZ(${orien2}deg)`;

    setTimeout(() => {
        dice1.setAttribute("style", `animation: none; transform: rotateZ(${orien1}deg)`);
        dice2.setAttribute("style", `animation: none; transform: rotateZ(${orien2}deg)`);
    }, 400);

    // game logic

    let button1 = document.getElementById("button1");
    let button2 = document.getElementById("button2");
    let p1Score = document.getElementById("p1Score");
    let p2Score = document.getElementById("p2Score");

    let score = rand1 + rand2;

    let button1State = document.getElementById("button1").disabled;

    let progress1 = document.getElementById("progress1");
    let progress2 = document.getElementById("progress2");

    if (!button1State) {
        if (score != 7) {
            player1Score += score;
            p1Score.innerText = player1Score;
            progress1.setAttribute('value',player1Score);
            checkWinner();
        }
        
        else {
            let button1 = document.getElementById("button1");
            button1.disabled = true;
            let button2 = document.getElementById("button2");
            button2.disabled = false;
        }
    }

    else {
        if (score != 7) {
            player2Score += score;
            p2Score.innerText = player2Score;
            progress2.setAttribute('value',player2Score);
            checkWinner();
        }
        
        else {
            let button1 = document.getElementById("button1");
            button1.disabled = false;
            let button2 = document.getElementById("button2");
            button2.disabled = true;
        }
    }
}

let checkWinner = () => {
    let target = document.getElementById("tar").innerText;
    let p1S = document.getElementById("p1Score").innerText;
    let p2S = document.getElementById("p2Score").innerText;

    let p1 = document.getElementById("p1Name").innerText;
    let p2 = document.getElementById("p2Name").innerText;

    target = Number(target);
    p1S = Number(p1S);
    p2S = Number(p2S);

    if (p1S >= target) {
        let winScreen = document.getElementsByClassName("winScreen")[0];
        let winner = document.getElementById("winner");
        winner.innerText = p1;
        winScreen.style.visibility = "visible";
    }
    if (p2S >= target) {
        let winScreen = document.getElementsByClassName("winScreen")[0];
        let winner = document.getElementById("winner");
        winner.innerText = p2;
        winScreen.style.visibility = "visible";
    }
}