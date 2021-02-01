var BackGround
var balloon;
var balloonImg;
var database;
var BalloonHeight;
var height;

function preload() {
  BackGround = loadImage('Images/BackGround.png');
  balloonImg = loadImage('Images/HotAirBalloon.png');
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 1000);

  balloon = createSprite(250, 650, 150, 150);
  balloon.addImage(balloonImg);
  balloon.scale = 0.5;

  BalloonHeight = database.ref('balloon/position');
  BalloonHeight.on('value', readHeight);
}

function draw() {
  background(BackGround);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
  } 
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);   
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
  }

  drawSprites();
}

function updateHeight(x, y){
  database.ref('balloon/position').set({
    'x' : height.x + x,
    'y' : height.y + y
  });
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}