var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl, girl_running, girl_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3;
var score;
var gameOverImg,restartImg

function preload(){
  girl_running = loadAnimation("girl1.png","girl2.png");
  girl_collided = loadAnimation("girl_collided.png");
  
  groundImage = loadImage("ground.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  
}

function setup() {
  //windowHeight - used to refer screen height
  createCanvas(windowWidth, windowHeight);

  girl = createSprite(50,height-35,20,50);
  girl.addAnimation("running", girl_running);
  girl.addAnimation("collided", girl_collided);
  
  girl.scale = 0.5;
  //height - is used to refer to the canvas height. It goes from top to bottom
  ground = createSprite(200,height-50,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  gameOver = createSprite(width/2,height/2-50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(width/2,height/2+30);
  restart.addImage(restartImg);
  
  gameOver.scale = 1.5;
  restart.scale = 1.5;
  
  invisibleGround = createSprite(200,height-35,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  girl.setCollider("rectangle",0,0,girl.width,girl.height);
  
  
  score = 0;
  
}

function draw() {
  
  background(250);

  textSize(25);
  //displaying score
  text("Score: "+ score, width-500,50);
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
   
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& girl.y >= height-100) {
        girl.velocityY = -12;
        jumpSound.play();
    }
    
   
    girl.velocityY = girl.velocityY + 0.8
  
   
    spawnClouds();
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(girl)){
        
        
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
     //change the trex animation
      girl.changeAnimation("collided", girl_collided);
    
      if(mousePressedOver(restart)) {
        reset();
      }
     
      ground.velocityX = 0;
      girl.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);    
   }
  
 
  
  girl.collide(invisibleGround);
  



  drawSprites();
}

function reset(){
  gameState = PLAY;
  score = 0;
  cloudsGroup.destroyEach();
  obstaclesGroup.destroyEach();
  girl.changeAnimation("running",trex_running);
}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(width,height-40,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(width,120,40,10);
    cloud.y = Math.round(random(80,height/2));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
  }
}
  