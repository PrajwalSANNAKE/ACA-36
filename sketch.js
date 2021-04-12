//declaration of global variables.
var bg, backgroundImg;
var ironman,man;
var rockImg,rockGroup;
var diamondGroup,diamondImg;
var score=0;
var spikeGroup,spikeImg
//preload is used to load assets.
function preload() {
  backgroundImg = loadImage("images/bg.jpg");
  ironman = loadImage("images/iron.png")
  rockImg = loadImage("images/stone.png");
  diamondImg= loadImage("images/diamond.png")
  spikeImg =loadImage("images/spikes.png")

}

function setup() {
  //creating background sprite.
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(backgroundImg)
  bg.scale=2;
  //greating ironman sprite.
  man =createSprite(100,500)
  man.addImage(ironman)
  man.scale=0.3
  //creating ground sprite.
  ground = createSprite(200,585,2000,10);
  ground.visible =false;
  man.setCollider("rectangle",10,10,300,300);
  rockGroup=new Group();
  diamondGroup=new Group();
  spikeGroup=new Group();
}

function draw() {
  //making ironman move up with up arrow.
  if (keyDown("up")){
    //making ironman move left with left arrow.
    man.velocityY = -10;}
    if (keyDown("left")){
      man.x = man.x -7;
    }
    //making ironman move right with right arrow. 
    if (keyDown("right")){
      man.x = man.x+7;}
  //gravity    
  man.velocityY = man.velocityY + 0.5
  //making ironman collide with the ground.
  man.collide(ground)
  //making background move
  bg.velocityY=4;
  if (bg.y>600){
    bg.y=bg.width/4;}

    //calling function to generate diamonds
    generateDiamonds();
    //making ironman touch the diamonds
    for(var i = 0 ; i < (diamondGroup).length;i++){
     temp=(diamondGroup).get(i);
    if(temp.isTouching(man)){
        score++;
        temp.destroy();
        temp=null;
      }
    }
    //calling function to generate spikes
    generatespike();
    //making ironmn touch the spikes 
    for(var i = 0 ; i< (spikeGroup).length ;i++){
      var temp = (spikeGroup).get(i) ;
      
      if (temp.isTouching(man)) {
        score=score-5;
        temp.destroy();
        temp=null;
        }
      }

    //calling function to generate rocks   
    generaterock ();
    //making ironman touch the rock
    for (var i = 0; i <rockGroup.length; i++){
      var temp = rockGroup.get(i);
      if(temp.isTouching(man)){
        man.collide(temp);
      }
    }
    
    drawSprites();
    textSize(20);
    stroke("white");
    text("Diamonds collected : "+score,500,50);
}

//to generate infinite rocks
function generaterock(){
  if ( frameCount % 70 ===0){
    var rock = createSprite(120,120,40,10);
    rock.x=random(50,1000);
    rock.addImage(rockImg);
    rock.scale =1;
    rock.velocityY= 5;
    rockGroup.add(rock);
  }
}

//to generate infinite diamonds
function generateDiamonds(){
  if (frameCount % 50 === 0) {
    var diamond = createSprite(1200,120,40,10);
    diamond.addImage(diamondImg)
    diamond.x = Math.round(random(80,1000));
    diamond.scale = 0.5;
    diamond.velocityY= 3;
    diamond.lifetime = 1200;
    diamondGroup.add(diamond);
  }
}

//to generate infinite spikes
function generatespike(){
  if(frameCount % 150 === 0){
    var spike = createSprite(1200,100,10,40);
    spike.addImage(spikeImg);
    spike.x = random(50, 1000);
    spike.velocityY = 4;
    spike.scale=0.7;
     
   spikeGroup.add(spike);
   spike.lifetime=600;
  
    }
  }



