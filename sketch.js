// 1 = start screen
// 2 = instructions screen
// 3 = game screen
// 4 = lose screen
// 5 = win screen
var page = 1;

// background and images
var bg;
var player;
var end;
var madImg;
var starImg;

// player score
var score = 0;
var scoreHistory = [];
var scoreSaved = false;

// falling Poké Balls
var madX = [];
var madY = [];
var madSpeed = [];
var madSize = [];
var madImage = [];

// falling berries
var starX = [];
var starY = [];
var starSpeed = [];
var starSize = [];
var starImage = [];

var W = 800;
var H = 400;

function preload() {
  bg = loadImage("pokemon-emerald-intro-wallpaper-v0-Ga24Es10Ast8ng42qrU-odZUfHMR6d8Ceofmbwy5rWw.jpg.webp");
  player = loadImage("0025.webp");
  end = loadImage("Pokemon Ruby and Sapphire End Screen.jpg");

  madImg = loadImage("Poke_Ball_Sprite.webp");
  starImg = loadImage("Sitrus_Berry.webp");
}

function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (page == 1) {
    startScreen();

  } else if (page == 2) {
    instructionsScreen();

  } else if (page == 3) {
    gameScreen();

  } else if (page == 4) {
    endScreen();

  } else if (page == 5) {
    winScreen();
  }
}

function startScreen() {
  image(bg, width / 2, height / 2, width, height);

  // dark box
  fill(0, 0, 0, 160);
  rect(160, 60, 480, 250, 25);

  // title
  fill(255, 230, 80);
  textSize(48);
  text("POKÉMON CATCH", width / 2, 125);

  // subtitle
  fill(255);
  textSize(22);
  text("Collect berries and avoid Poké Balls!", width / 2, 175);

  // instructions button
  fill(100, 220, 220);
  rect(width / 2 - 110, 220, 220, 60, 15);

  fill(0);
  textSize(24);
  text("INSTRUCTIONS", width / 2, 250);
}

function mousePressed() {
  // Start screen button goes to instructions
  if (page == 1 && checkClick(width / 2 - 110, 220, 220, 60)) {
    page = 2;
  }

  // Instructions button goes to actual game
  else if (page == 2 && checkClick(width / 2 - 100, 305, 200, 55)) {
    resetGame();
    page = 3;
  }

  // Lose screen play again button
  else if (page == 4 && checkClick(width / 2 - 90, 300, 180, 55)) {
    resetGame();
    page = 1;
  }

  // Win screen play again button
  else if (page == 5 && checkClick(width / 2 - 90, 300, 180, 55)) {
    resetGame();
    page = 1;
  }
}

function checkClick(x, y, w, h) {
  var xOverlap = mouseX > x && mouseX < x + w;
  var yOverlap = mouseY > y && mouseY < y + h;

  return xOverlap && yOverlap;
}

function gameScreen() {
  image(bg, width / 2, height / 2, width, height);

  // player follows mouse
  image(player, mouseX, mouseY, 45, 45);

  // score
  fill(255);
  textSize(22);
  textAlign(CENTER, CENTER);
  text("Score: " + score, 700, 25);

  moveStar(starX, starY, starSpeed, starSize, starImage);

  if (page == 3) {
    moveMad(madX, madY, madSpeed, madSize, madImage);
  }
}

function endScreen() {
  image(end, width / 2, height / 2, width, height);

  fill(0, 0, 0, 170);
  rect(180, 60, 440, 270, 25);

  fill(255, 80, 80);
  textSize(42);
  text("GAME OVER", width / 2, 110);

  fill("yellow");
  textSize(26);
  text("FINAL SCORE: " + score, width / 2, 165);

  if (scoreSaved == false) {
    scoreHistory.push(score);
    scoreSaved = true;
  }

  fill(255);
  textSize(17);
  text("Past Scores:", width / 2, 205);

  for (let i = 0; i < scoreHistory.length; i++) {
    text("Game " + (i + 1) + ": " + scoreHistory[i], width / 2, 230 + i * 18);
  }

  // play again button
  fill(255, 0, 0);
  rect(width / 2 - 90, 300, 180, 55, 15);

  fill(255);
  textSize(22);
  text("PLAY AGAIN", width / 2, 327);
}

function winScreen() {
  image(bg, width / 2, height / 2, width, height);

  fill(0, 0, 0, 170);
  rect(170, 65, 460, 260, 25);

  fill(255, 230, 80);
  textSize(46);
  text("YOU WIN!", width / 2, 125);

  fill(255);
  textSize(24);
  text("You collected all the berries!", width / 2, 180);
  text("Final Score: " + score, width / 2, 220);

  if (scoreSaved == false) {
    scoreHistory.push(score);
    scoreSaved = true;
  }

  // play again button
  fill(100, 220, 220);
  rect(width / 2 - 90, 300, 180, 55, 15);

  fill(0);
  textSize(22);
  text("PLAY AGAIN", width / 2, 327);
}

function makeMad(count) {
  for (let i = 0; i < count; i++) {
    madX.push(random(0, W));
    madY.push(random(-H, -50));
    madSpeed.push(random(1, 3));
    madSize.push(30);
    madImage.push(madImg);
  }
}

function makeStar(count) {
  for (let i = 0; i < count; i++) {
    starX.push(random(0, W));
    starY.push(random(-H, -50));
    starSpeed.push(random(1, 3));
    starSize.push(30);
    starImage.push(starImg);
  }
}

function isColliding(px, py, pxSize, ox, oy, oSize) {
  return dist(px, py, ox, oy) < pxSize / 2 + oSize / 2;
}

function moveMad(xList, yList, speedList, sizeList, imageList) {
  for (let j = 0; j < xList.length; j++) {
    yList[j] += speedList[j];

    image(imageList[j], xList[j], yList[j], sizeList[j], sizeList[j]);

    // collision with Poké Ball = game over
    if (isColliding(mouseX, mouseY, 40, xList[j], yList[j], sizeList[j])) {
      page = 4;
    }

    // reset if it falls past bottom
    if (yList[j] > height) {
      yList[j] = random(-H, -50);
      xList[j] = random(0, W);
    }
  }
}

function moveStar(xList, yList, speedList, sizeList, imageList) {
  for (let j = 0; j < xList.length; j++) {
    yList[j] += speedList[j];

    image(imageList[j], xList[j], yList[j], sizeList[j], sizeList[j]);

    // collision with berry = score increases
    if (isColliding(mouseX, mouseY, 40, xList[j], yList[j], sizeList[j])) {
      score += 1;

      xList.splice(j, 1);
      yList.splice(j, 1);
      speedList.splice(j, 1);
      sizeList.splice(j, 1);
      imageList.splice(j, 1);

      j--;

      if (score >= 20) {
        page = 5;
      }

      continue;
    }

    // reset if it falls past bottom
    if (yList[j] > height) {
      yList[j] = random(-H, -50);
      xList[j] = random(0, W);
    }
  }
}

function instructionsScreen() {
  image(bg, width / 2, height / 2, width, height);

  // dark transparent box
  fill(0, 0, 0, 175);
  rect(70, 35, 660, 330, 25);

  // title
  fill(255, 230, 80);
  textAlign(CENTER, CENTER);
  textSize(44);
  text("HOW TO PLAY", width / 2, 85);

  // instructions
  fill(255);
  textSize(24);
  text("Move Pikachu with your mouse!", width / 2, 145);

  textSize(22);
  text("Collect the Sitrus Berries to increase your score.", width / 2, 190);
  text("Avoid the Poké Balls or the game ends.", width / 2, 230);
  text("Collect all 20 berries to win!", width / 2, 270);

  // start game button
  fill(255, 210, 60);
  rect(width / 2 - 100, 305, 200, 55, 15);

  fill(0);
  textSize(24);
  text("START GAME", width / 2, 332);
}

function resetGame() {
  score = 0;
  scoreSaved = false;

  madX = [];
  madY = [];
  madSpeed = [];
  madSize = [];
  madImage = [];

  starX = [];
  starY = [];
  starSpeed = [];
  starSize = [];
  starImage = [];

  makeMad(20);
  makeStar(20);
}  
  }else if (page == 4) {
    winScreen();
  }
}

// other partner start screen
function startScreen() {
     image(bg, width/2, height/2, width, height);
  fill(100, 200, 200);
  rect(width/2-50, height/2, 100, 50)
  fill(0);
  textAlign(CENTER, CENTER);
  text("start", width/2, height/2+25);

}

//user input when mouse pressed
function mousePressed(){
  if (page == 1 && checkClick(width/2-50, height/2, 100, 50)){
    resetGame();
    page = 2;
  } else if (page == 3 && checkClick(width/2-50, height/2, 100, 50)){
    resetGame();
    page = 1;
  }
}

//checking clicks
function checkClick(x,y,w,h){
  var xOverlap=mouseX>x && mouseX < x+w;
   var yOverlap=mouseY>y && mouseY < y+h;
  
  return xOverlap && yOverlap;
}
//other partner game screen
function gameScreen(){
   image(bg, width/2, height/2, width, height);

   let px = mouseX + 5;
  let py = mouseY + 5;  
 
image(player, mouseX, mouseY, 40, 40);
  
  
  

  text("Score:"+score, 700, 15)
   moveStar(starX, starY, starSpeed, starSize, starImage);
  moveMad(madX, madY, madSpeed, madSize, madImage);
  

}

//other partner shows endscreen and final score and past scores
function endScreen(){
  image(end, width/2, height/2, width, height)
    fill(255,0,0)
  rect(width/2-50, height/2, 100, 50)
  fill(255);
  textAlign(CENTER, CENTER);
  text("PLAY AGAIN", width/2, height/2+25);
  fill("yellow")
  text("FINAL SCORE: "+score, 400, 280)
  
  if (scoreHistory.length == 0 || scoreHistory[scoreHistory.length - 1] !=score){
    scoreHistory.push(score);
  }
  for (let i =0; i < scoreHistory.length; i++) {
    text("Past score"+ (i+1)+ ":" + scoreHistory[i], 400, 310 + i * 20);
  }
}

//other partner
var madX=[];
var madY=[];
var madSpeed=[];
var madSize=[];
var madImage=[];
var W=800;
var H=400;

//my function aka the make functions
function makeMad(count){
  for(let i=0; i<count; i=i+1){
    madX.push(random(0, W));
    madY.push(random(-H, -50));
    madSpeed.push(random(1,1));
    madSize.push(random(30,30));
            madImage.push(loadImage("Poke_Ball_Sprite.webp"));
  }
  
}

function isColliding(px, py, pxSize, ox, oy, oSize) {
  return dist(px, py, ox, oy) < (pxSize/2 + oSize/2);
}

//other partner
function moveMad( xList, yList, speedList, sizeList, imageList){
for (let j = 0; j < xList.length; j++) {
  yList[j] += speedList[j];
  image(imageList[j], xList[j], yList[j], sizeList[j], sizeList[j]);

  // collision = game over
  if (isColliding(mouseX, mouseY, 40, xList[j], yList[j], sizeList[j])) {
    page = 3;
  }

    if (yList[j] > height) {
    yList[j] = random(-H, -50);
    xList[j] = random(0, W);
  }
  
}
}

//my created list 
var starX=[];
var starY=[];
var starSpeed=[];
var starSize=[];
var starImage=[];
var W=800;
var H=400;

//my function aka the make functions
function makeStar(count){
  for(let i=0; i<count; i=i+1){
    starX.push(random(0, W));
    starY.push(random(-H, -50));
    starSpeed.push(random(1,1));
    starSize.push(random(30,30));
            starImage.push(loadImage("Sitrus_Berry.webp"));
  }
  
}

//other partner
function moveStar( xList, yList, speedList, sizeList, imageList){
  for (let j = 0; j < xList.length; j++) {
  yList[j] += speedList[j];
  image(imageList[j], xList[j], yList[j], sizeList[j], sizeList[j]);

  // collision with player
  if (isColliding(mouseX, mouseY, 40, xList[j], yList[j], sizeList[j])) {
  score += 1;

  xList.splice(j, 1);
  yList.splice(j, 1);
  speedList.splice(j, 1);
  sizeList.splice(j, 1);
  imageList.splice(j, 1);

  j--; // important so loop doesn't skip next item
}
if (yList[j] > height) {
  yList[j] = random(-H, -50);
  xList[j] = random(0, W);
}
}
}


//resetting game
 function resetGame(){
  score = 0;

  makeMad(20);
  makeStar(20);
   
  // clear all arrays
  madX = [];
  madY = [];
  madSpeed = [];
  madSize = [];
  madImage = [];

  starX = [];
  starY = [];
  starSpeed = [];
  starSize = [];
  starImage = [];

  // recreate objects
  makeMad(20);
  makeStar(20);
}



