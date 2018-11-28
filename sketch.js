//GLOBAL VAR
var mySong;
var analyzer;
var state = 0;

function preload() {
  mySong = loadSound("./song.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
  background(40);
  mySong.onended(function finish() {
    state = 2;
  });

  //CHANGE STATE
  if (state == 0) {
    drawStateZero();
  } else if (state == 1) {
    drawStateOne();
    if(mySong.isPlaying == false && state == 1){
      state = 2;
    } else if(state==2){
      background(40);
    }
  }
}

function drawButton() {
  var button = 'Ready!';

  var ref = min(width, height);
  var posX = width / 2;
  var posY = 3 * height / 4;
  var rectW = ref / 5;
  var rectH = ref / 10;

  push();
  stroke(255);
  noFill();
  rect(posX, posY, rectW, rectH);
  pop();

  push();
  textSize(ref / 20);
  fill(255);
  noStroke();
  textFont('Montserrat');
  textAlign(CENTER, CENTER);
  text(button, posX, posY);
  pop();
}

function drawStateZero() {
  var ref = min(width, height);
  var boxW = ref;
  var boxH = height / 2;

  var title = 'Travel in Space and Time';
  textSize(ref / 10);
  fill(255);
  noStroke();
  textFont('Alfa Slab One');
  textAlign(CENTER);
  text(title, width / 2, height / 2, boxW, boxH);

  drawButton()
}

function drawStateOne() {
  ref = min(width, height);
  var vol = 0;

  if (mySong.isPlaying() == false) {
    mySong.play();
  }

  vol = analyzer.getLevel();
  vol = map(vol, 0, 1, 0, height);

  var offset = ref / 10;

  //TEXTURE
  for (var x = 0; x < width; x += offset) {
    for (var y = 0; y < height; y += offset) {
      var l = vol / 2;
      noFill();
      stroke(35);
      strokeWeight(2);
      ellipse(x + offset, y + offset, l, l);
    }
  }

  //COLOR
  var modColor = map(mouseX, 0, width, 0, 255);
  var alpha = map(mouseY, 0, height, 100, 255);
  stroke(0 + modColor, 255 - modColor, 255, alpha);

  //ELLIPSE
  strokeWeight(ref / 10);
  ellipse(width / 2, height / 2, vol * 10);

  //TITLE
  var title = 'Doctor Who';
  textSize(ref / 10);
  fill(255);
  noStroke();
  textFont('Alfa Slab One');
  textAlign(CENTER, CENTER);

  text(title, width / 2, height / 2);
}

function mousePressed() {
  var ref = min(width, height);
  var posX = width / 2;
  var posY = 3 * height / 4;
  var rectW = ref / 5;
  var rectH = ref / 10;

  if (mouseX > posX - rectW / 2 && mouseX < posX + rectW / 2 && mouseY > posY - rectH / 2 && mouseY < posY + rectH / 2) {
    if (state == 0) {
      state = 1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
