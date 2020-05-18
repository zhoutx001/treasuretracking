let mapimg;
let map1;
let clat = 0;
let clon = 0;
let zoom = 1.4;
let artworks;
let diameter = 10
// let sliderBtn;
// let sliderBtnImg;
let artImg=[];

const LOCNUM = 6
let locX = []
let locY = []
let activeLoc = []
let marker = []

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v8/static/0,0,1.4,0.00,0.00/1200x800?access_token=pk.eyJ1Ijoic2lyaGNuZXAiLCJhIjoiY2s5aG5nYTlxMTBqdTNlbm9ieHVrdjJtbSJ9.IeEpVj_sL-bWULPbttnwUw')
  artworks = loadStrings('Data11.csv')
  map1 = loadImage('images/finalmap.png')
  // sliderBtnImg=loadImage()
}

function mercX(lon) {
  lon = radians(lon);
  let a = (256 / PI) * pow(2, zoom);
  let b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  let a = (256 / PI) * pow(2, zoom);
  let b = tan(PI / 4 + lat / 2);
  let c = PI - log(b);
  return a * c;
}



function setup() {
  let canvas=createCanvas(1350, 880);
  canvas.parent('sketch-div');
  canvas.position(400,0)
  canvas.style('position: fixed')
  canvas.style('z-index:0')


  // translate(width / 2, height / 2);
  imageMode(CENTER);
  background(0)
  //image(mapimg, 0, 0)

  let cx = mercX(clon);
  let cy = mercY(clat);

  for (let i = 1; i < artworks.length; i++) {
    locX[i - 1] = []
    locY[i - 1] = []
    var data = artworks[i].split(/@/);
    let activeNum = 0;
    let itemIndex=i;

    for (let locIndex = 0; locIndex < LOCNUM; locIndex++) {
      if (!isNaN(data[5 * (locIndex + 1) + 1]) && data[5 * (locIndex + 1) + 1] != 0) {
        locX[i - 1][activeNum] = mercX(data[5 * (locIndex + 1) + 1]) - cx;
        locY[i - 1][activeNum] = mercY(data[5 * (locIndex + 1)]) - cy;
        activeNum++;
      }
    }
    //**********
    // marker.push(new Marker(locX[i - 1], locY[i - 1], random(0.5,1), 7,data[35],itemIndex));
    marker.push(new Marker(locX[i - 1], locY[i - 1], random(0.5,1), 2,data[35],itemIndex,data[1],data[2],data[34]));
    //print(marker[i-1].itemIndex)
  }

}



function draw() {
  translate(width / 2.1, height / 1.4);

  for (let i = 1; i < artworks.length; i++) {
    let activeNum = locX[i - 1].length;
    for (let locIndex = 0; locIndex < activeNum - 1; locIndex++) {
      noStroke();
      //起点
      fill(255,100, 0, 10);
      circle(locX[i - 1][locIndex], locY[i - 1][locIndex], 5);
      //链线
      stroke(255, 230, 0, 5);
      strokeWeight(1);
      line(locX[i - 1][locIndex], locY[i - 1][locIndex], locX[i - 1][locIndex + 1], locY[i - 1][locIndex + 1])
    }
      //终点
      noStroke();
      fill(255, 255, 0, 10);
      circle(locX[i - 1][activeNum - 1], locY[i - 1][activeNum - 1], 5);
  }


  push()
  translate(40, -188);
  scale(1.1,1.1)
  image(map1, 0 , 0 )
  pop()
  for (let i = 1; i < artworks.length; i++) {
    marker[i - 1].move();
    marker[i - 1].display();
    marker[i - 1].onHover();
    // print(marker[i - 1].itemIndex);
    // if(marker[i - 1].onHover())print(marker[i - 1].itemIndex);
  }

  // print(marker[3].x);
}
// function showStory(let n){
//
//
// }

function printGood(){
  // document.getElementById("storyCard").style.display = "block";
  // document.getElementById("sliderBtn").style.display = "none";

  // document.getElementById("storyCard").style.display = "block";
}


