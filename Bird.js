// Cengiz Sahin for http://www.sahinc.de, Copyleft 2017

function Bird() {
  this.diameter = 32;
  this.y = (height - this.diameter) / 2;
  this.x = width / 3;
  this.drawTelemetry = true;

  this.gravity = 0.7;
  this.lift = -20;
  this.velocity = 0;
  this.img = loadImage("./bird.png");

  this.telemetry = function () {
    if (this.drawTelemetry) {
      // Axis
      line(this.x, 0, this.x, height);
      line(0, this.y, width, this.y);

      // Velocity-Vector
      stroke('red');
      strokeWeight(5);
      line(this.x, this.y, this.x, this.y + (this.velocity * 20));
      if (this.velocity > 0)
        triangle(this.x - 3, this.y + (this.velocity * 20), this.x + 3, this.y + (this.velocity * 20), this.x, this.y + (this.velocity * 20) + 6);
      else
        triangle(this.x - 3, this.y + (this.velocity * 20), this.x + 3, this.y + (this.velocity * 20), this.x, this.y + (this.velocity * 20) - 6);
      strokeWeight(1);
      stroke(0);

      // Telemetry box
      fill('rgba(128,128,128,0.67)');
      rect(5, 5, 140, 95);
      textSize(12);
      fill(255);
      textFont("Courier New");
      text("       Y  = " + Math.round(this.y), 10, 20);
      text("Velocity  = " + Math.round(this.velocity, 4), 10, 35);
      text("   Speed  = " + gameSpeed, 10, 50);
      text(" Dynamic  = " + gameMode, 10, 65);
      text(" Gravity  = " + this.gravity, 10, 80);
      text("FrameRate = " + round(frameRate(), 4), 10, 95);
      textFont("Helvetica");
    }
  }

  this.show = function () {
    fill(255);
    push();
    imageMode(CENTER);
    //    ellipse(this.x, this.y, this.diameter, this.diameter);
    translate(this.x, this.y);
    if (this.velocity > 0)
      rotate(PI / 4.0);
    else
      rotate(PI / -4.0)
    image(this.img, 0, 0);
    pop();
  }

  this.up = function () {
    this.velocity += this.lift;
  }

  this.update = function () {
    this.velocity += this.gravity;
    this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.y = height;
      this.velocity = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocity = 0;
    }
  }
}