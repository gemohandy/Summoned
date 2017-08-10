//Image Indices:
//0 to 23: Demon walking right
//24 to 47:Demon Idle
//48 to 71: Demon Walking Left
//72: First Room Background
var images = [
  {name:"art/demon/walkingRight/Demon Walk", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/demon/idle/Demon Idle", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/demon/walkingLeft/Demon Walk", extension:".png", upBound: 24, loaded: false, width:155, height:230},
  {name:"art/rooms/firstRoom", extension:".png", upBound: 1, loaded: false, width:1200, height:400}
];

var loadedImages = [];

function preloader(){
  for(var i in images){
    loadImage(images[i]);
  }
  isLoad();
}

var walkState = 0;
var isIdle = true;
var thingToDo;

var impPos = 420;
var impHeight = 180;
var roomOffset = -300;


function getMouseOnCanvas(event){
  canvas = document.getElementById("gameBox");
  return {x:event.clientX-canvas.offsetLeft-roomOffset, y:event.clientY-canvas.offsetTop};
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
    idle();
  }
  else{
    window.setTimeout(isLoad,250);
  }
}

function backgroundDraw(){
  c.setTransform(1,0,0,1,roomOffset,0);
  image = loadedImages[72]
  c.drawImage(image,0,0,1200,400);
}

function idle(){
  if(walkState < 24 || walkState > 47){
    walkState = 24;
  }
  c = document.getElementById("gameBox").getContext("2d");
  backgroundDraw();
  image = loadedImages[walkState];
  c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
  walkState++;
  thingToDo = setTimeout(idle, 25);
}

function walk(destination){
  if(destination>impPos){
    if(walkState < 0 || walkState > 23){
      walkState = 0;
    }
    c = document.getElementById("gameBox").getContext("2d");
    backgroundDraw();
    image = loadedImages[walkState];
    c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
    walkState++;
    impPos += 5;
  }
  else{
    if(walkState < 48 || walkState > 71){
      walkState = 48;
    }
    c = document.getElementById("gameBox").getContext("2d");
    backgroundDraw();
    image = loadedImages[walkState];
    c.drawImage(image,impPos,impHeight,image.getAttribute("width"),image.getAttribute("height"));
    walkState++;
    impPos -= 5;
  }
  if(impPos != destination){
    thingToDo = setTimeout(function(){walk(destination)}, 25);
  }
  else{
    idle();
  }
}

function doStuff(event){
  mouse = getMouseOnCanvas(event);
  isIdle = false;
  mouse.x -= mouse.x % 5;
  mouse.x -= 90;
  window.clearTimeout(thingToDo);
  walk(mouse.x);
}
