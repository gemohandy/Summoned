//Image Indices:
//0 to 23: Demon walking right
//24 to 47:Demon Idle
//48 to 71: Demon Walking Left
//72 to 88: First Room Background
var images = [
  {name:"art/demon/walkingRight/Demon Walk", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/demon/idle/Demon Idle", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/demon/walkingLeft/Demon Walk", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/rooms/firstRoom/firstRoom", extension:".png", upBound: 17, loaded: false, width:1200, height:400}
];

var loadedImages = [];
var c;

//Before we do anything else, we need to make sure we have all of the assets loaded. That's what the preloader is for.

function preloader(){
  c = document.getElementById("gameBox").getContext("2d");
  for(var i in images){
    loadImage(images[i]);
  }
  isLoad();
}

function loadImage(image){
  if(!image.loaded){
    var imgSrc;
    var trailName;
    for(var i = 0; i < image.upBound; i++){
      trailName = i.toString();
      while(trailName.length < 4){
        trailName = "0" + trailName;
      }
      imgSrc = document.createElement("img");
      imgSrc.setAttribute("src", image.name+trailName+image.extension);
      imgSrc.setAttribute("width", image.width);
      imgSrc.setAttribute("height", image.height);
      loadedImages.push(imgSrc);
    }
  }
}

function checkLoad(){
  for(var i in loadedImages){
    if(!loadedImages[i].complete) return false;
  }
  return true;
}

function isLoad(){
  if(checkLoad()){
    drawEverything();
  }
  else{
    window.setTimeout(isLoad,250);
  }
}

//Now we can actually do stuff. We need an animation state, which everything will access

var animState = 0;
var impState = 0;
var impDest;
var isIdle = true;
var thingToDo;

var impPos = 420;
var impHeight = 180;
var roomOffset = -300;


function getMouseOnCanvas(event){
  canvas = document.getElementById("gameBox");
  return {x:event.clientX-canvas.offsetLeft-roomOffset, y:event.clientY-canvas.offsetTop};
}

function drawEverything(){
  c.setTransform(1,0,0,1,roomOffset,0);
  backgroundDraw();
  switch(impState){
    case 0:
      idle();
      break;
    case 1:
      walk();
      break;
  }
  animState++;
  thingToDo = setTimeout(drawEverything, 25);
}

function backgroundDraw(){
  c.setTransform(1,0,0,1,roomOffset,0);
  image = loadedImages[72+animState%17];
  c.drawImage(image,0,0,1200,400);
}

function idle(){
  walkState = 24 + animState % 24;
  image = loadedImages[walkState];
  c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
  walkState++;
}

function walk(){
  if(impDest>impPos){
    walkState = animState % 24;
    image = loadedImages[walkState];
    c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
    walkState++;
    impPos += 5;
  }
  else{
    walkState = 48 + animState % 24;
    image = loadedImages[walkState];
    c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
    walkState++;
    impPos -= 5;
  }
  if(impPos == impDest){
    impState = 0;
  }
}

function doStuff(event){
  mouse = getMouseOnCanvas(event);
  impState = 1;
  isIdle = false;
  mouse.x -= mouse.x % 5;
  mouse.x -= 90;
  impDest = mouse.x;
}
