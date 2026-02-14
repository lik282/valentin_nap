//console.log(basket);
//a scaling

let yes = document.getElementById("yes");
let no = document.getElementById("no");
let fedo = document.querySelector(".fedo");

let yesWidth = 120;   // starting width
let yesHeight = 60;   // starting height
let clickCount = 0;   // track number of clicks

const messages = [
    "Légyszi?",
    "Gondold meg még...",
    "Tényleg nem?",
    "Az utolsó esély!",
    "Komolyan?!",
    "Nagyon biztos vagy?",
    "Nem fogod megbánni?",
    "OK, elfogadom a választásod..."
];

no.addEventListener("click", () => {
    // Incremental growth - each click grows more than the last
    let growthMultiplier = 1 + clickCount * 0.3;  // 1, 1.3, 1.6, 1.9, etc.
    yesWidth += 40 * growthMultiplier;
    yesHeight += 30 * growthMultiplier;
    yes.style.width = yesWidth + "px";
    yes.style.height = yesHeight + "px";
    yes.style.fontSize = (18 + (yesWidth - 120) / 20 * 2) + "px";  // scale font size
    
    // Show message
    if (clickCount < messages.length) {
        no.textContent = messages[clickCount];
        no.style.animation = "none";  // reset animation
        setTimeout(() => {
            no.style.animation = "shake 0.3s";
        }, 10);
    }
    
    clickCount++;
});

yes.addEventListener("click", () => {
    fedo.style.backgroundImage = "url('img/pusheen.png')";
    fedo.style.backgroundSize = "contain";
    fedo.style.backgroundPosition = "center";
    fedo.style.backgroundRepeat = "no-repeat";
    fedo.style.backgroundColor = "transparent";
    
    // Hide the card
    document.querySelector("h2").style.display = "none";
    document.getElementById("game").style.display = "none";
    
    let card = document.querySelector(".fedo-card");
    if (card) card.style.display = "none";
});





let basket = document.getElementById("basket");
let scoreDisplay = document.getElementById("score");
let score = 0;

let gameActive = true;
let spawnInterval;





document.addEventListener("keydown", function(event) {

    if (!gameActive) return; //stop movement if game is over
    
    let left = basket.offsetLeft;

    if (event.key === "ArrowLeft" && left > 0) {
        basket.style.left = left - 20 + "px";
    }

    if (event.key === "ArrowRight" && left < window.innerWidth - 80) {
        basket.style.left = left + 20 + "px";
    }

});

//basket.style.background = "green";

function createHeart() {
    let heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";

    

    document.getElementById("game").appendChild(heart);


    let topPosition = 0;
    let fall = setInterval(function() {

        topPosition += 3 + Math.random() * 4;
        heart.style.top = topPosition + "px";

        checkCollision(heart, fall);

        if (topPosition > window.innerHeight) {
            clearInterval(fall);
            heart.remove();
        }
        
    }, 20);
}

spawnInterval = setInterval(createHeart, 1000);



function checkCollision(heart,fallInterval) {

    let basketRect = document
    .getElementById("basketHitbox")
    .getBoundingClientRect();



    let heartRect = heart.getBoundingClientRect();

    if(
        heartRect.bottom >= basketRect.top &&
        heartRect.top <= basketRect.bottom &&
        heartRect.right >= basketRect.left &&
        heartRect.left <= basketRect.right
    ) {
        clearInterval(fallInterval);
        heart.remove();

        score++;
        scoreDisplay.textContent = score;

        if (score === 14) {
            
            gameActive = false;

            clearInterval(spawnInterval);

            fedo.style.opacity = "1";
            fedo.style.pointerEvents = "auto";
            console.log(fedo);
        }
    }
}

