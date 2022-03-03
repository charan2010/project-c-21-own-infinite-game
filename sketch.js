var rocket, background1, fire, stones, gameOver, over;
var rocketImage, backgroundImage, fireImage, stoneImage, gameOverImage, overImage;
var fireGroup, stonesGroup;
var fireregain = 150;
var frameCount = 0;
var score = 0;
var gameState = "PLAY";

function preload(){
    rocketImage = loadImage("rocket.png");
    backgroundImage = loadImage("background.png");
    fireImage = loadImage("fire.png");
    stoneImage = loadImage("stones.png");
    gameOverImage = loadImage("gameover.png");
    overImage = loadImage("over.png");
}

function setup() {
    createCanvas(490, windowHeight);
    stonesGroup = createGroup();
    background1 = createSprite(200, 200, width, height);
    background1.addImage(backgroundImage);
    background1.scale = 1.2;
    background1.velocityY = 7;
    
    rocket = createSprite(200, 200, 50, 50);
    rocket.addImage(rocketImage);
    rocket.scale = 0.20;

    stoneImage = loadImage("stones.png");

    stonesGroup = createGroup();
    fireGroup = createGroup();
}


function draw() {
    background(0);
    

    rocket.x = World.mouseX;
    rocket.y = World.mouseY;

    if(gameState === "PLAY") {
      console.log(fireregain);
      frameCount += 1;
      score += 1;
      fireregain += 1;
      console.log(frameCount);
      if(keyDown("space") && fireregain > 150) {
        fire = createSprite(rocket.x, rocket.y, 10, 10);
        fire.addImage(fireImage);
        fire.scale = 0.02;
        fire.velocityY = Math.round(random(-5, -12));
        fireregain = 0;

        fireGroup.add(fire);
      }
      spawnstones();
    } else if(gameState === "END") {
      rocket.destroy();
      fireGroup.destroyEach();
      stonesGroup.destroyEach();
      over = createSprite(300, 300, 300, 300);
      over.addImage(overImage);
      over.scale = 3;
      gameOver = createSprite(250, 300, 250, 300);
      gameOver.addImage(gameOverImage);
      score = score + 0;
      fireregain = fireregain + 0;
    }
    
    if(background1.y > 400) {
      background1.y = 250;
    }
    

    if(fireGroup.collide(stonesGroup)){
      stonesGroup.destroyEach();
      fireGroup.destroyEach();
    }

    if(rocket.collide(stonesGroup)) {
      gameState = "END";
    } 
    
    
    
    drawSprites();
    

    textSize(30);
    text("Score: " + score, 320, 30)
}

function spawnstones(){
  
  if (frameCount % 200 === 0) {
    var stones = createSprite(200, -50);
    stones.scale = 0.07;

    stones.x = Math.round(random(120, 400));
    stones.addImage(stoneImage);
    
    stones.velocityY = Math.round(random(10, 25));

    stonesGroup.add(stones);

    stonesGroup.add(stones);
    
    if(stones.y > 700) {
      stones.destroy();
    }
  }
}

