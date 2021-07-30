var backgroundImg, background;
var octopusImg, octopus;
var fish, fishImg, fishGroup;
var bag, bagImg, bagGroup;
var gameState = "play";
var score = 0;


function preload(){
backgroundImg = loadImage("background.png");
octopusImg = loadImage("octopus.png");
fishImg = loadImage("fish.png");
bagImg = loadImage("bag.png");
}

function setup() {
 createCanvas(600,600);

 background = createSprite(300,300);
 background.addImage("background", backgroundImg);
 background.velocityY = 1;

 octopus = createSprite(200,200,50,50);
 octopus.addImage("octopus", octopusImg);
 octopus.scale = 0.1;

 fishGroup = new Group();
 bagGroup = new Group();
}

function draw() {

    if(gameState === "play") {
        if(background.y > 400) {
            background.y = 300
        }

        if(keyDown("LEFT_ARROW")) {
            octopus.x = octopus.x - 3;
        }

        if(keyDown("RIGHT_ARROW")) {
            octopus.x = octopus.x + 3;
        }

        if(keyDown("SPACE")) {
            octopus.velocityY = -5;
        }

        octopus.velocityY = octopus.velocityY + 0.8;

        if(fishGroup.isTouching(octopus)) {
            fishGroup.destroyEach();
            score = score+50;
        }

        if(bagGroup.isTouching(octopus)) {
            octopus.destroy();
            gameState = "end";
        }
        createFish();
        createBag();

        textSize(20);
    fill("yellow");
    text("Score: "+ score, 150, 50);
    }

    if(gameState === "end") {
        stroke("white");
        fill("light blue");
        textSize(25);
        text("Game Over", 230, 250);
    }

    drawSprites();
}

function createFish() {
    if(World.frameCount % 200 === 0) {
        fish = createSprite(Math.round(random(50,350), 40, 10, 10));
        fish.addImage("fishy", fishImg);
        fish.scale = 0.12;
        fish.velocityY = 2;
        fish.lifetime = 650;
        fishGroup.add(fish);
    }
}

function createBag() {
    if(World.frameCount % 200 === 0) {
        bag = createSprite(Math.round(random(50,350), 40, 10, 10));
        bag.addImage("bag", bagImg);
        bag.scale = 0.075;
        bag.velocityY = 4;
        bag.lifetime = 650;
        bagGroup.add(bag);
    }
}