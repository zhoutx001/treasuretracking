class Marker {
  constructor(pathX, pathY, speed, r, documented,itemIndex) {
    this.startX = pathX[0];
    this.startY = pathY[0];
    this.endX = pathX[1];
    this.endY = pathY[1];

    this.pathX = pathX;
    this.pathY = pathY;
    this.pathLen = pathX.length;

    this.speed = speed;
    this.speedX = 0;
    this.speedY = 0;
    this.findSpeed();

    this.x = this.startX;
    this.y = this.startY;

    this.ind = 0;

    this.R = r;
    this.currentR = r;
    this.prevR=r;

    this.doc = documented;
    this.itemIndex=itemIndex;
  }

  showImg(){
  // image(this.img, 100- width / 2, 100- height / 2,100,100);
  // document.getElementById("detailedPage").src = "images/"+01+".png";
  document.getElementById("detailedPage").src = "images/detailedPages/"+this.itemIndex.toString()+".png";

  }

  findSpeed() {
    this.speedX = this.speed * (this.endX - this.startX) / dist(this.startX, this.startY, this.endX, this.endY);
    this.speedY = this.speed * (this.endY - this.startY) / dist(this.startX, this.startY, this.endX, this.endY);
  }

  rebuildNowPath() {
    this.startX = this.pathX[this.ind];
    this.startY = this.pathY[this.ind];
    this.endX = this.pathX[this.ind + 1];
    this.endY = this.pathY[this.ind + 1];
  }

  move() {
    if (dist(this.x, this.y, this.startX, this.startY) >= dist(this.endX, this.endY, this.startX, this.startY)) {

      if (this.ind < this.pathLen - 2) {
        this.ind++;
      } else if (this.ind == this.pathLen - 2) {
        this.ind = 0;
        this.currentR = this.R;
        this.prevR=this.R;
      }

      this.rebuildNowPath();
      this.x = this.startX;
      this.y = this.startY;
      this.findSpeed();
    }
  }

  // onHover(){
  //   if(!isNaN(this.x)&&!isNaN(this.y)){
  //     if (dist(this.x, this.y, (mouseX - (width / 2.1)), (mouseY - (height / 1.4))) >= 3)
  //     {
  //       this.x += this.speedX;
  //       this.y += this.speedY;
  //       // this.r = this.R;
  //
  //       if(this.currentR>this.prevR){
  //           this.currentR=this.prevR;
  //       }
  //
  //       if(this.currentR>2)
  //         this.currentR-=0.003;
  //
  //       this.prevR=this.currentR;
  //
  //     }else{
  //       this.currentR=this.R*2;
  //       this.showImg()
  //     }
  //
  //     }
  //
  // }
  
  onHover(){
    if(!isNaN(this.x)&&!isNaN(this.y)){
      if (dist(this.x, this.y, (mouseX - (width / 2.1)), (mouseY - (height / 1.4))) >= 7)
      {
        this.x += this.speedX;
        this.y += this.speedY;
        // this.r = this.R;

        if(this.currentR<this.prevR){
            this.currentR=this.prevR;
        }

        if(this.currentR<7)
          this.currentR+=0.006;

        this.prevR=this.currentR;

      }else{
        this.currentR=this.R*2;
        this.showImg()
      }

      }

  }
  display() {

    if (this.doc == "Yes") {
      fill(186, 211, 24)
    } else if (this.doc == "No") {
      fill(220, 160, 20)
    }

    //fill(211, 151, 50)
    ellipse(this.x, this.y, this.currentR * 2);
    // if(this.currentR==this.R*2)
      // print(this.itemIndex)
  }

}
