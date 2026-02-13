//console.log(basket);

let basket = document.getElementById("basket");
let scoreDisplay = document.getElementById("score");
let score = 0;

let gameActive = true;
let spawnInterval;

let fedo = document.querySelector(".fedo");





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

