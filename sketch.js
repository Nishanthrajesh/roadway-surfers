var Jake,Jake_running,Jake_sp;
var bomb,bomb_Image,car,carImg,carGroup
var path,path_Image;
var energy,energy_Image,crash,button
var sound,soundloader,coin_sound,powerup_sound,button
var lifes=0;
var gameState=0,bg
var score=0,t=0;
function preload()
{
  Jake_running=loadAnimation("Jake1.png","Jake2.png","jake4.PNG","jake5.png");

  Jake_sp=loadAnimation("Jake1_sp.png","Jake2_sp.png","Jake3_sp.png","Jake4_sp.png","Jake5_sp.png");

  path_Image=loadImage("path.png");

  bg=loadImage("sf_bg.png")
  
  bomb_Image=loadImage("coin.png");

  carImg=loadImage("car1_.png")

  car1Img=loadImage("car2_.png")
  
  energy_Image=loadImage("energyDrink.png");
  
  soundloader=loadSound("Subway-Surfers-theme-song.mp3")

  coin_sound=loadSound("coinsound.mp3")

  crash=loadSound("subway-surfers-crash.mp3")

  powerup_sound=loadSound("powerupsound.mp3")
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  bombGroup= createGroup();
  energyGroup= createGroup();
  carGroup=createGroup()
  this.playButton = createButton('PLAY')
  this.playButton.position(width/2,height/2+200,750,1000)
  this.playButton.size(150,50)
  this.playButton.style("font-family", "Arial Black");
  //jakeGroup=createGroup();
  path=createSprite(width/2,height/2,width/3);
  path.scale=2.5;
  path.addImage("moving",path_Image);
  soundloader.loop();
   //creating jake
  Jake= createSprite(width/2,height/2);
  Jake.addAnimation("running",Jake_sp);
  Jake.scale=0.75;
  Jake.setCollider("rectangle", 0, 0,40, 100);
}


function draw() 
{
  if(gameState==0)
  {
    background(bg)
    this.playButton.mousePressed(()=>
    {
      this.playButton.hide();
      gameState=1
    })
  }
  if(gameState==1)
  {  
  background("black");
  invisibleGround = createSprite(450, height/2, 10, 400);
  invisibleGround2 = createSprite(1100,height/2, 10, 400);
  invisibleGround.visible=false;
  invisibleGround2.visible = false;
  Jake.collide(invisibleGround); 
  path.velocityY=(lifes/10)+10
  //path.velocityY-=100
  if(t==0)
  {
  score=score+1
  }
  else
  {
    score=score+0
  }

  if(frameCount%150==0)
  {
    car=createSprite(Math.round(random(550,900),-100))
    car.addImage(carImg)
    car.velocityY+=5
    carGroup.add(car)
  }

  for(i=0;i<carGroup.length;i++)
  {
    if(Jake.isTouching(carGroup[i]))
    {
      Jake.collide(carGroup[i])
      Jake.destroy()
      t=1
      crash.play()
    }
  }

  if(t==1)
  {
    energyGroup.setVelocityYEach(0)
    carGroup.setVelocityYEach(0)
    carGroup.destroyEach()
    path.velocityY=0
    soundloader.stop()
  }


  if(path.velocityY<0)
  {
    path.velocityY=5
  }

    //creating coin
    if(frameCount%50==0)
    {
    bomb=createSprite(Math.round(random(width/2-250,width/2+250)),-100);
    bomb.addImage(bomb_Image);
    bomb.scale=0.5;
    bomb.velocityY=path.velocityY;
    bombGroup.add(bomb)
    //jakeGroup.add(Jake)
    }

    if(frameCount%300==0)
    {
      energy=createSprite(Math.round(random(width/2-250,width/2+250)),-100);
      energy.addImage(energy_Image);
      energy.velocityY=path.velocityY;
      energy.scale=0.1;
      energyGroup.add(energy)
    }

    if(frameCount%200==0)
    {
      car=createSprite(Math.round(random(550,900),-100))
      car.addImage(car1Img)
      car.velocityY+=5
      carGroup.add(car)
    }
    
for(i=0;i<energyGroup.length;i++)
{
  if(Jake.isTouching(energyGroup))
{  
  console.log("hi")
  energyGroup[i].destroy()
  powerup_sound.play()
  path.velocityY/=10
  score=score-100
}
}

for (i=0;i<bombGroup.length;i++)
 {
    if(Jake.isTouching(bombGroup))
  {
    bombGroup[i].destroy()
    lifes=lifes+10;
    coin_sound.play()
  }
 }

 carGroup.depth=bombGroup.depth+100
 carGroup.depth=energyGroup.depth+100

 if(keyDown("left"))
{
    Jake.x = Jake.x-15;
} 

  if(keyDown("right")) 
{
      Jake.x = Jake.x+15;
} 

   Jake.collide(invisibleGround2);

  for(i=0;i<bombGroup.length;i++)
  {
    if(bombGroup[i].y>1250)
    {
      bombGroup[i].destroy();
    } 
  }
  
  if(Jake.y>1250)
  {
    Jake.destroy() 
  }

  for(i=0;i<energyGroup.length;i++)
  {
   if(energyGroup[i].y>1250)
   {
     energyGroup[i].destroy();
   } 
  }
    if(path.y>1250)
    {
      path.y=windowHeight/2; 
    }   
  drawSprites();
  fill("orange");
  textSize(50);
  text("score: "+"₹"+lifes, 1200, 50);
  textFont("aptos")
  text("Time: "+Math.round(score/60)+"s", 200, 50)

  if(t==1)
  {
    fill("yellow")
    textFont("Blackadder ITC")
    textSize(50)
    text("Game Over",width/2-125,height/2)
    
  }
}
}

