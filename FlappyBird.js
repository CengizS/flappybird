// Cengiz Sahin for http://www.sahinc.de, Copyleft 2017


var bird;
var pipes = [];
var score = 0;
var alreadyHit = false;
var hasTelemetry = false;
var gameSpeed = 4;
// gameMode: false = static speed of pipes, true = dynamic speed of pipes
var gameMode = false;
var hasLegend = true;
var isPaused = false;
var playSound = true;
var woosh;
var bg;

function anyRandom(x, y) {
  return Math.floor(Math.random() * ((y-x)+1) + x);
}

function preload() {
  woosh = loadSound("./woosh.mp3");
  bg = loadImage("./cloud.jpg");
}

function setup() {
//  createCanvas(window.innerWidth, window.innerHeight);
  createCanvas(800, 600);
  bird = new Bird();
  pipes.push(new Pipe(gameMode, anyRandom(2, 10), gameSpeed));
}

function draw() {
  background(bg);

    // Draw the pipes
    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update();

      // If Bird hits the pipes ...
      if (pipes[i].hits(bird)) {
        if(!alreadyHit) {
          score -= 15;
          alreadyHit = true;
        }
      }

    // whenever a pair of pipes is off-screen remove it from the pipes-array
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
      if(!alreadyHit) {
        score += 10;  
      }
      
      alreadyHit = false;
    }
  }

  bird.update();
  bird.show();

  var rndFrameCount = anyRandom(40, 80);
  rndFrameCount = 40;
  if (frameCount % rndFrameCount == 0) {
    pipes.push(new Pipe(gameMode, anyRandom(2, 10), gameSpeed ));
  }

  // Draw Score
  fill(0)
  textSize(32);
  var cWidth = textWidth(""+score);
  text(score, ((this.width-cWidth)/2)+2, 52);
  fill(50, 205, 50);
  textSize(32);
  textFont("Helvetica");
  cWidth = textWidth(""+score);
  text(score, (this.width-cWidth)/2, 50);

  // Draw telemetry if on
  if(hasTelemetry)
    bird.telemetry();

  if(hasLegend)
    drawLegend();

  if(isPaused)
    drawPause();
}

function drawLegend() {
  // Legend box
  fill('rgba(128,128,128,0.67)');
  var tX = width-250;
  rect(tX-5, 5, 250, 125);
  textSize(12);
  fill(255);
  textFont("Courier New");
  text("SPACE/Tap = Flap", tX, 20);
  text("M        = Toggle dynamic-pipes", tX, 35)
  text("UP/DOWN  = Slower / Faster", tX, 50);
  text("----------------------------------", tX, 65);
  text("T        = Toggle telemetry", tX, 80);
  text("L        = Toggle legend", tX, 95);
  text("P        = Pause game", tX, 110);
  text("S        = Toggle sound", tX, 125);
  textFont("Helvetica");
}

function drawPause() {
  if(isPaused) {
    var txtPause = "PAUSED, hit P again to resume";
    textSize(40);
    var pWidth = textWidth(txtPause);    
    var tX = (width-pWidth)/2;
    var tY = (height-40)/2;
    fill(0);
    text(txtPause, tX+3, tY+3);
    fill(255);
    text(txtPause, tX, tY);
  }
}

function doSound(sound) {
  if(playSound)
    woosh.play();
}

function keyPressed() {
  // We do not want all keys being processed when resuming after pause
  // So only be aware of keyPressed-Events when not paused.
  if(!isPaused) {
    if (key == ' ') {
      doSound(woosh);
      bird.up();
    }
    if (key == 'T') {
      hasTelemetry = !hasTelemetry;
    }
    if (keyCode == UP_ARROW) {
      gameSpeed++;
    }
    if (keyCode == DOWN_ARROW) {
      gameSpeed--;
    }
    if (key == 'M') {
      gameMode = !gameMode;
    }
    if (key == 'L') {
      hasLegend = !hasLegend;
    }
    if (key == 'S') {
      playSound = !playSound;
    }    
  }
  if (key == 'P') {
    isPaused = !isPaused;
    if(isPaused)
      noLoop();
    else
      loop();
  }

}

function touchStarted() {
  doSound(woosh);
  bird.up();
}

function shadeBlendConvert(p, from, to) {
    if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
    if(!this.sbcRip)this.sbcRip=function(d){
      var l=d.length,RGB=new Object();
      if(l>9){
        d=d.split(",");
            if(d.length<3||d.length>4)return null;//ErrorCheck
            RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
          }else{
            if(l==8||l==6||l<4)return null; //ErrorCheck
            if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
            d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
          }
          return RGB;}
          var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=sbcRip(from),t=sbcRip(to);
    if(!f||!t)return null; //ErrorCheck
    if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
    else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}

