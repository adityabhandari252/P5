let alive = true
let ast1x
let ast1y = 25
let fastAst = false
let fastAstx 
let fastAsty = 25
let astVelo = 2
let fastVelo = 4
let shotVelo = 3
let time = 0
let shot1 = false
let shot1canshoot = true
let shot1x
let shot1y = 475
let points = 0
let blink = 0

function setup() {
  frameRate(60)
  createCanvas(500, 500)
  ast1x = random(25, 475)
  fastAstx = random(25, 475)
  background("#222222")
}

function draw() {
  noStroke()
  background("#222222")
  
  // Timer
  if (alive == true && frameCount % 60 == 0) {
    time = time + 1
  }

  // Points System
  if (alive == true) {
    fill(color(255))
    textSize(25)
    text("POINTS: " + str(points), 365, 25)
  } else {
    textSize(50)
    fill(color(255))
    text("GAME OVER", 100, 230)
    blink = blink + 1
    if (blink % 5 == 0) {
      fill(color(50))
      textSize(30)
      text("FINAL SCORE: " + str(points), 135, 275)
    } else {
      fill(color(91, 194, 54))
      textSize(30)
      text("FINAL SCORE: " + str(points), 135, 275)
    }
  }

  // Spaceship
  if (alive == true) {
    fill(color(113, 119, 134))
    quad(mouseX - 25, 495, mouseX + 25, 495, mouseX + 15, 475, mouseX - 15, 475)   
  } else {
    fill(color(255, 129, 0))
    beginShape();
    vertex(mouseX - 25, 495)
    vertex(mouseX, 485)
    vertex(mouseX + 25, 495)
    vertex(mouseX + 10, 475)
    vertex(mouseX + 30, 455)
    vertex(mouseX + 10, 463)
    vertex(mouseX, 450)
    vertex(mouseX - 10, 463)
    vertex(mouseX - 30, 455)
    vertex(mouseX - 10, 475)
    endShape(CLOSE);
  }

  // Asteroid 1
  if (alive == true) {
    fill(color(255, 211, 25))
    if (alive == true) {
      ast1y = ast1y + astVelo
    }
    if (ast1y >= 475) {
      alive = false
    }
    circle(ast1x, ast1y, 20)
  }

  // Shot 1
  if (alive == true && shot1 == true) {
    fill(color(255))
    shot1y = shot1y - shotVelo
    circle(shot1x, shot1y, 20)
  }
  
  // Asteroid Hit
  if (alive == true) {
    if ((shot1x + 18 >= ast1x && shot1x <= ast1x && shot1y - 18 <= ast1y && shot1y >= ast1y)
        || (shot1x - 18 <= ast1x && shot1x >= ast1x && shot1y - 18 <= ast1y && shot1y >= ast1y)) {
      ast1y = 25
      ast1x = random(25, 475)
      shot1y = 475
      shot1 = false
      shot1canshoot = true
      points = points + 1 
    }
  }
  
  // Fast Asteroid
  if (alive == true) {
    if (time % 5 == 0 && time != 0) {
      fastAst = true
    }
    if (fastAst == true) {
      fill(color(255, 0, 0))
      circle(fastAstx, fastAsty, 20)
      fastAsty = fastAsty + fastVelo
      if (fastAsty >= 475) {
        alive = false
      }
    }
  }

  // Fast Asteroid Hit
  if (alive == true) {
    if ((shot1x + 18 >= fastAstx && shot1x <= fastAstx && shot1y - 18 <= fastAsty && shot1y >= fastAsty)
        || (shot1x - 18 <= fastAstx && shot1x >= fastAstx && shot1y - 18 <= fastAsty && shot1y >= fastAsty)) {
      fastAsty = 25
      fastAstx = random(25, 475)
      fastAst = false
      shot1y = 475
      shot1 = false
      shot1canshoot = true
      points = points + 2
    }
  }  

}

function keyPressed() {
  if (keyCode === UP_ARROW && alive == true && shot1canshoot == true) {
    shot1x = mouseX
    shot1 = true
    shot1canshoot = false
  }

}