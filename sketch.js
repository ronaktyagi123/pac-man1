var score=0
var life=3
var ghost
var gameState=1
function preload() {
    appleimg = loadImage("apple.png")
    blueghostimg = loadImage("blue ghost.png")
    redghostimg = loadImage("red ghost.png")
    pinkghostimg = loadImage("Pink ghost.png")
    backgroundimg = loadImage("bg 1.jpg")
    backgroundimg = loadImage("bg 2.jpg")
    cherryimg = loadImage("cherry.png")
    pacmanimg = loadImage("pac man.gif")
    strawberryimg = loadImage("strawberry.png")
    wallimg = loadImage("wall.png")
    yellowghostimg = loadImage("yellow ghost.png")
    gameoverimg=loadImage("game_over.png")
}




function setup() {
    createCanvas(windowWidth, windowHeight)
    pacman = createSprite(50, height - 200, 50, 50)
    pacman.scale = 0.3
    pacman.addImage(pacmanimg)
    ghostG=createGroup()
    obstacleG=createGroup()
gameover=createSprite(width/2,height/2)
gameover.addImage(gameoverimg)
gameover.scale=0.5
    for (var i = 0; i < width * 5; i += 80) {
        ground = createSprite(i, height - 100, width, 20)
        ground.addImage(wallimg)
        ground.scale = 0.5
        
        pacman.collide(ground)

       

    }
    //  groundG.add(ground)
 }
function draw() {
    background(backgroundimg)

    if(gameState===1){  
          spawnObstacles()
    spawnFruits()

    if(keyDown(UP_ARROW)){
        pacman.y-=6
    }

    if(keyDown(DOWN_ARROW)){
        pacman.y+=6
    }

    if(ground.x<-200){
        ground.x=width/2
    }
   


    if(ghostG.isTouching(pacman)){
        life=life-1
        ghostG.destroyEach()
    }   

    if(obstacleG.isTouching(pacman)){
        score+=1
        obstacleG.destroyEach()
    }

    gameover.visible=false

    if(life===0 ){
        gameState=2
        
    }
}
    if(gameState===2){
        ground.velocityX=0
        obstacleG.setVelocityXEach(0)
        ghostG.setVelocityXEach(0)
        gameover.visible=true
    }
    drawSprites()

    fill(255)
    textSize(50)
    text("Score: "+score, width-300,100)
    text("life: "+life, width-300,150)
}

function spawnObstacles() {
    if (frameCount % 250 === 0) {
        var ghost= createSprite(width, height-120 , 10, 40);
        ghost.velocityX = -6;


        // //generate random obstacles
        var rand = Math.round(random(1, 4));
        switch(rand) {
             case 1: ghost.addImage(yellowghostimg);
             ghost.scale=0.05
                break;
             case 2: ghost.addImage(pinkghostimg);
            ghost.scale=0.05
                 break;                
             case 3: ghost.addImage(redghostimg);
            ghost.scale=0.05
                 break;                
             case 4: ghost.addImage(blueghostimg);
            ghost.scale=0.2
                break;
           
            default: break;
         }        ghost.y = Math.round(random(height-500,height-180));
         //assignscale and lifetime to the obstacle           
                 ghost.lifetime = 500;
                 ghostG.add(ghost)
    }
}

function spawnFruits() {
    if (frameCount % 150 === 0) {
        var obstacle = createSprite(width, height-120 , 10, 40);
        obstacle.velocityX = -6;


        // //generate random obstacles
        var rand = Math.round(random(1, 3));
        switch (rand) {
             case 1: obstacle.addImage(appleimg);
             obstacle.scale=0.105
                break;
             case 2: obstacle.addImage(cherryimg);
            obstacle.scale=0.02
                 break;                
             case 3: obstacle.addImage(strawberryimg);
            obstacle.scale=0.105
                 break;
                
            
           
            default: break;
         }        obstacle.y = Math.round(random(height-500,height-180));
         //assignscale and lifetime to the obstacle           
                 obstacle.lifetime = 500;
                 obstacleG.add(obstacle)

    }
}


