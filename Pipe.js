// Cengiz Sahin for http://www.sahinc.de, Copyleft 2017

function Pipe(gameMode, gameSpeed, defaultSpeed) {
  // Ensure that the gapSize is always sufficient to the bird
  var minGapSize = 90;
  var gapSize = 10;
  while (gapSize < minGapSize) {
    //console.log("gapSize = "+gapSize);
    this.top = random(height / 2);
    this.bottom = random(height / 2);
    gapSize = floor(height - this.top - this.bottom);

  }
  this.x = width;
  this.w = 70;
  if (gameMode == 0)
    this.speed = defaultSpeed;
  else
    this.speed = gameSpeed;

  this.highlight = false;

  this.hits = function (bird) {
    if (bird.y < this.top || bird.y > height - this.bottom) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
        this.highlight = true;
        return true;
      }
    }
    this.highlight = false;
    return false;
  }

  this.show = function () {
    fill(255, 215, 0);
    if (gameMode) {
      fill(shadeBlendConvert(-0.2 * this.speed / 4, 'rgb(255,215,0)'));
    }

    if (this.highlight) {
      fill(255, 0, 0);
    }
    rect(this.x, 0, this.w, this.top);
    rect(this.x - 10, this.top - 30, this.w + 20, 30);

    rect(this.x, height - this.bottom, this.w, this.bottom);
    rect(this.x - 10, height - this.bottom, this.w + 20, 30);

    if (hasTelemetry) {
      // drawGap
      fill(255, 0, 0, 100);
      rect(this.x, this.top, this.w, height - this.bottom - this.top);
      fill(255);
      stroke(0);

      var cWidth = textWidth(gapSize + "px");
      text(gapSize + "px", (this.x + this.w - cWidth) - cWidth / 2, this.top + (gapSize / 2));
      fill('red');
      ellipse(this.x, this.top, 5, 5);
      ellipse(this.x, height - this.bottom, 5, 5);

    }
  }

  this.update = function () {
    this.x -= this.speed;
  }

  this.offscreen = function () {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}