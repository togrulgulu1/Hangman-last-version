let letDiv = document.querySelector(".letters");
let btn = document.querySelector(".button");
let divDesc = document.querySelector(".desc");
let secretDiv = document.querySelector(".secret");
let hangMan = document.querySelector(".hangMan");
let winScreen = document.querySelector(".winScreen")
let loseScreen = document.querySelector(".loseScreen")
let againBtn = document.querySelectorAll(".again")
let blurScreen = document.getElementById("blurScreen")
let startMenu = document.querySelector(".startMenu")
let startBtn = document.querySelector(".startBtn")
let musicBtn = document.querySelector(".musicToggleBtn")
let soundBtn = document.querySelector(".soundToggleBtn")

let words = ["red", "blue", "green", "black", "purple", "white", "orange", "yellow", "brown", "pink", "gray"];
let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];

let colors = null;
let active = true;
let count = 0;
let musicPlay = true
let soundPlay = true

// window.onload = function () {
//     backMusic()
//     mainMenu()
// }

function backMusic() {

    const music = document.getElementById("back-music")
    music.play()

    musicBtn.addEventListener("click", () => {

        if (musicPlay) {

            music.pause()
            musicBtn.innerHTML = '<i class="fa-brands fa-itunes-note"></i><i class="fa-solid fa-slash"></i>'

        } else {
            
            music.play()
            musicBtn.innerHTML = '<i class="fa-brands fa-itunes-note"></i>'

        }

        musicPlay = !musicPlay

    })

}

// let audio = new Audio("analog2.mp3");

// audio.addEventListener("canplay", function () {
//     audio.play();
// });

function playClickSound() {

    if (soundPlay) {

        const audio = document.getElementById("btn-music")
        audio.currentTime = 0
        audio.play()

    }


}

function setupSound() {

    soundBtn.addEventListener("click", () => {

        soundPlay = !soundPlay
        soundBtn.innerHTML = soundPlay ? '<i class="fa-solid fa-volume-high"></i>':'<i class="fa-solid fa-volume-xmark"></i>'

    })
}


function mainMenu() {

    startBtn.addEventListener("click", () => {

        if (active) {
            startNewRound();
            writeWords();
        }

        backMusic()
        // setupSoundToggle()
        setupSound()
        active = false;
        divDesc.textContent = "Write color name";
        startMenu.style.display = "none"

    })


}
mainMenu()


function startGame() {

    btn.addEventListener("click", () => {

        if (active) {
            startNewRound();
            writeWords();
        }

        active = false;
        divDesc.textContent = "Write color name";

    });
}

function againButton() {

    againBtn.forEach(e => {
        e.addEventListener("click", () => {

            if (active) {

                startNewRound();

            }

            active = false;

            hangMan.style.backgroundImage = ""
            winScreen.style.display = "none";
            loseScreen.style.display = "none"
            blurScreen.style.display = "none"

            writeWords();
            startGame()
        });
    })
}
againButton()

function startNewRound() {

    colors = words[Math.floor(Math.random() * words.length)];
    console.log(colors);

}

function writeWords() {

    for (let i = 0; i < colors.length; i++) {
        secretDiv.innerHTML += `<div class="line"></div>`;
    }

    let btns = document.querySelectorAll(".letter");

    btns.forEach(e => {
        e.addEventListener("click", guessLetter);
    });

}

function guessLetter(a) {

    let btn = a.target;
    let isActive = false;

    for (let i = 0; i < colors.length; i++) {

        if (btn.textContent == colors[i]) {
            secretDiv.querySelectorAll(".line")[i].innerHTML = colors[i];
            btn.style.backgroundColor = "green";
            isActive = true;

        }

    }

    if (!isActive && count != 8) {
        btn.style.backgroundColor = "red";
        hangMan.style.backgroundImage = `url(image/hangman-${count}.svg)`;
        count++;
        console.log(count);
    }

    playClickSound()
    win();
    lose();

    if (count == 7) {
        resetGame();
    }
}


function win() {

    let correctGuesses = document.querySelectorAll(".line");
    let isComplete = Array.from(correctGuesses).every(guess => guess.textContent !== "");

    if (isComplete) {

        hangMan.style.backgroundImage = "";
        correctGuesses = ""
        winScreen.style.display = "block"
        blurScreen.style.display = "block"
        resetGame();
        writeWords();

    }
}

function lose() {
    if (count == 7) {
        loseScreen.style.display = "block"
        blurScreen.style.display = "block"
        resetGame();
        writeWords()
    }
}

function resetGame() {

    // divDesc.textContent = "";
    secretDiv.innerHTML = "";
    count = 0;
    startNewRound();

    let btns = document.querySelectorAll(".letter");
    btns.forEach(btn => {
        btn.style.backgroundColor = "";
    });

    startGame()

}

alphabet.forEach(e => {
    letDiv.innerHTML += `<div class="letter">${e}</div>`;
});

// startGame();





