let width = 800;
let height = 600;

let xBall = width / 2;
let yBall = height / 2;

let diameter = 30;
let radius = diameter / 2;

let xSpeedBall = 5;
let ySpeedBall = 5;

let cores = {
  "preto": 0,
  "branco": 255
}

function setup() {
  createCanvas(width, height);  
}

function draw() {
  background(cores.preto);
  
  // Desenhando a bolinha
  showBall();
  
  // Movimentar em x e y
  moveBall();
  
  // Verifica se colidiu com as bordas
  checkEdgeCollision();
}

function showBall() {
  circle(xBall, yBall, diameter);
}

function moveBall() {
  xBall += xSpeedBall;
  yBall += ySpeedBall;
}

function checkEdgeCollision() {
  // Borda esquerda e borda direita
  if(xBall + radius == width || xBall - radius == 0) {
    xSpeedBall *= -1;
  }
  
  // Borda superior e borda inferior
  if(yBall + radius == height || yBall - radius == 0){
    ySpeedBall *= -1;
  }
}