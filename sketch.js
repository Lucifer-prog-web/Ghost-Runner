var ghost,ghostImg
var tower ,towerImg
var door,doorImg,dg
var climbingImg,climber,cg
 var gameState = "play";
 var block,bg
 var spookySound

function preload() {
  ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png")
  towerImg = loadImage("tower.png")
  doorImg = loadImage("door.png")
  climbingImg = loadImage("climber.png")

  spookySound = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600, 600);

  spookySound.loop();

  tower = createSprite(300,300)
  tower.addImage("tower",towerImg)
  tower.velocityY = 2;

  ghost = createSprite(200,200,50,50)
  ghost.addAnimation("ghost",ghostImg)
  ghost.scale = 0.3;

  dg = new Group();
  cg = new Group();
  bg = new Group();
}

function draw() {
  background(200);
  if(gameState === "play"){

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -8;
    }

    ghost.velocityY = ghost.velocityY + 0.8;

    if(tower.y>500){
      tower.y = 300;
    }
    
    spawnDoors();
    if(cg.isTouching(ghost)){
      ghost.velocityY = 0;
    }

    if(dg.isTouching(ghost) || ghost.y > 600 ){
      ghost.destroy();
      gameState = "end";
    }


    drawSprites();
  }

  if(gameState==="end"){
    stroke("yellow")
    fill("white")
    textSize(30)
    text("Game Over",260,300);
    

  }
  
  
  

}



function spawnDoors(){
  if(frameCount%250 ===0){
    door = createSprite(200,-50)
    door.x = Math.round(random (100,500))
    door.addImage("door",doorImg);
    door.velocityY = 2;
    door.lifetime = 700;
    dg.add(door);
    
    ghost.depth = door.depth;
    ghost.depth += 1;

    climber = createSprite(200,10)
    climber.x = door.x;
    climber.addImage(climbingImg)
    climber.velocityY = 2;
    climber.lifetime = 700;
    cg.add(climber);

    block = createSprite(200,15)
    block.width = climber.width;
    block.height = 2;
    block.x = door.x;
    block.velocityY = door.velocityY;
    block.lifetime = door.lifetime;
    block.visible = false;
    bg.add(block);

  }
}
