var images = [
  {name:"art/demon/walking/Demon Walk", extension:".png", upBound: 24, loaded: false, width:155, height:230},
];

var loadedImages = [];

function preloader(){
  for(var i in images){
    loadImage(images[i]);
  }
  console.log(loadedImages);
  isLoad();
}

var walkState = 0;
var doWalk = true;

var impPos = -230;

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
    walk();
  }
  else{
    window.setTimeout(isLoad,250);
  }
}

function walk(){
  if(doWalk){
    if(walkState < 0 || walkState > 23){
      walkState = 0;
    }
    c = document.getElementById("gameBox").getContext("2d");
    c.fillStyle = "#666666";
    c.fillRect(0,0,600,400);
    c.fillStyle = "#663300";
    c.fillRect(0,300,600,100);
    image = loadedImages[walkState];
    c.drawImage(image,impPos,150,image.getAttribute("width"),image.getAttribute("height"));
    walkState++;
    impPos += 5;
    if(impPos == 600){
      impPos = -230;
    }
    window.setTimeout(function(){walk(0,23);}, 25);
  }
}
