//////////////////////////////////////////////
/////    CONSTANTS  //////////////////////////
//////////////////////////////////////////////
const MOVE_LENGTH = 25;



//////////////////////////////////////////////
/////    PAGE LOAD  //////////////////////////
//////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', 
() => {
    console.log("Starting Game");


    // setInterval accepts a function as the first parameter and 
    // a time in milliseconds as the second parameter. It will continuously 
    // run the function over and over staggered by the time indicated in the 
    // second parameter. I am using it to alternate between two images of the 
    // ufo so that it looks like the lights are flashing
    setInterval( () => {
        const img = document.querySelector("#player img");
        
        if(img.src.endsWith("ufo-transparent1.png")) {
            img.src = img.src.replace("ufo-transparent1.png","ufo-transparent2.png");
            console.log(img.src);
        } else {
            img.src = img.src.replace("ufo-transparent2.png","ufo-transparent1.png");
            console.log(img.src);
        }

    }, 1000);

    
    //Default to the top left corner of the screen
    player.style.top="0px";
    player.style.left="0px";

    //Grab the entire body of the screen and tell it to listen for 
    // the key up event, then move the player according to what 
    // arrow was pressed
    const body = document.querySelector("body");
    body.addEventListener("keyup", (event) => {

        const player = document.getElementById("player");
        move(event.key, player);
        
        if(checkOverlaps(player)) {
            console.log("overlap!");
        }
    })
});


//////////////////////////////////////////////
/////    MOVE PLAYER  //////////////////////////
//////////////////////////////////////////////
function move(key, player) {

    if(key === "ArrowUp") {
        moveUp(player);
    }

    if(key === "ArrowDown") {
        moveDown(player);            
    }

    if(key === "ArrowLeft") {
        moveLeft(player);
    }

    if(key === "ArrowRight") {
        moveRight(player);
    }
}

function moveUp(player) {
    const rect = player.getBoundingClientRect();
    const newTop = rect.top-MOVE_LENGTH;
    player.style.top = newTop + "px";
}

function moveDown(player) {
    const rect = player.getBoundingClientRect();
    console.log(rect);
    let newTop = rect.top+MOVE_LENGTH;
    player.style.top = newTop + "px";
}

function moveRight(player) {
    const rect = player.getBoundingClientRect();
    const newLeft = rect.left + MOVE_LENGTH;
    player.style.left = newLeft + "px";    
}

function moveLeft(player) {
    const rect = player.getBoundingClientRect();
    const newLeft = rect.left - MOVE_LENGTH;
    player.style.left = newLeft + "px";   
}


//////////////////////////////////////////////
/////    OVERLAPS   //////////////////////////
//////////////////////////////////////////////

// create variables that keep track of if player is in planet
let numPlanetsVisited = 0;
let isInPlanet1 = false;

function checkOverlaps(player) {

    //check if player is in planet 1
    checkInPlanet1(player);

}

function checkInPlanet1(player) {
    const planet = document.getElementById("planet1");
    if(checkOverlap(planet, player)) {

        //if they were just outside the planet, 
        //indicate they are entering
        if(!isInPlanet1){
            updatePlanetCount();
            printMessage("Entering Planet 1");
        }

        isInPlanet1 = true;
    } else {

        //if they were just in the Planet, 
        //indicate they are leaving
        if(isInPlanet1) {
            printMessage("Leaving Planet 1");
        }

        isInPlanet1 = false;
    }
}

function checkOverlap(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();

    const overlap = !(rect1.right < rect2.left || 
        rect1.left > rect2.right || 
        rect1.bottom < rect2.top || 
        rect1.top > rect2.bottom);

    return overlap;
}

//////////////////////////////////////////////
/////    UTIL       //////////////////////////
//////////////////////////////////////////////
function updatePlanetCount() {
    
    numPlanetsVisited++;

    const planetCounter = document.getElementById("planetCount");
    planetCounter.innerText = numPlanetsVisited;
}

function printMessage(message) {
    const p = document.getElementById("messages");
    p.innerText = message;
}