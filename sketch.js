// 1= start screen, 2= game screen, 3= lose screen, 4= win screen
var page=1
//for background image
var bg
//player and player's score
var score=0
var player
//stores the player's score after each game
var scoreHistory = [];

// other partner pre loading the images here
function preload(){
  bg = loadImage("pokemon-emerald-intro-wallpaper-v0-Ga24Es10Ast8ng42qrU-odZUfHMR6d8Ceofmbwy5rWw.jpg.webp");
  player=loadImage("0025.webp");
  end = loadImage("Pokemon Ruby and Sapphire End Screen.jpg");
}

//other partner creates screen
function setup() {
  createCanvas(800, 400);
  imageMode(CENTER);
}

//other partner changes screen
function draw() {
 
  if (page == 1) {
    startScreen();

  } else if (page == 2) {
    gameScreen();
 

  } else if (page == 3) {
    endScreen();
  
  
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



