let width = 800;
let height = 600;

// ***** variáveis para a raquete do jogador ********************************** //
let widthPlayerRacquet = 15;
let heightPlayerRacquet = 150;

let xPlayerRacquet = 5;
let yPlayerRacquet = (height / 2) - (heightPlayerRacquet / 2);

let yPlayerRacquetSeep = 5;
// **************************************************************************** //

// ***** variáveis para a raquete do inimigo ********************************** //
let widthEnemyRacquet = 15;
let heightEnemyRacquet = 150;

let xEnemyRacquet = width - widthEnemyRacquet - 5;
let yEnemyRacquet = (height / 2) - (heightEnemyRacquet / 2);

let yEnemyRacquetSeep = 5;
// **************************************************************************** //

// ***** variáveis para a bolinha ********************************************* //
let xBall = width / 2;
let yBall = height / 2;

let diameter = 30;
let radius = diameter / 2;

let xBallSpeed = 5;
let yBallSpeed = 5;
// **************************************************************************** //

// Indica se a bolinha colidiu com as raquetes
let hit = false;

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
  
  // Desenhando as raquetes
  showRacquets();
  
  // Movimentar em x e y
  moveBall();
  
  // Movimenta a raquete do jogador
  movePlayerRacquet();
  
  // Verifica se a bolinha colidiu com as bordas
  checkEdgeCollision();
  
  // Verifica se a bolinha coliciu com as raquetes
  //checkRacquetCollision();
  checkRacquetCollision2DCollider();
}

function showBall() {
  circle(xBall, yBall, diameter);
}

function showRacquets(){
  rect(xPlayerRacquet, yPlayerRacquet, widthPlayerRacquet, heightPlayerRacquet);
  rect(xEnemyRacquet, yEnemyRacquet, widthEnemyRacquet, heightEnemyRacquet);
}

function moveBall() {
  xBall += xBallSpeed;
  yBall += yBallSpeed;
}

function movePlayerRacquet() {
  // Movimenta a raquete do jogador para cima e não deixa passar da borda
  if(keyIsDown(UP_ARROW) && yPlayerRacquet > 5) {
    yPlayerRacquet -= yPlayerRacquetSeep;
  } 
  // Movimenta a raquete do jogador para baixo e não deixa passar da borda
  else if(keyIsDown(DOWN_ARROW) && yPlayerRacquet + heightPlayerRacquet < height - 5) {
    yPlayerRacquet += yPlayerRacquetSeep;
  }
}

function checkEdgeCollision() {
  // Borda esquerda e borda direita
  if(xBall + radius == width || xBall - radius == 0) {
    xBallSpeed *= -1;
  }
  
  // Borda superior e borda inferior
  if(yBall + radius == height || yBall - radius == 0){
    yBallSpeed *= -1;
  }
}

function checkRacquetCollision() {
  // Verifica se houve colisão com a raquete do jogador
  if(xBall - radius < xPlayerRacquet + widthPlayerRacquet && 
     yBall - radius < yPlayerRacquet + heightPlayerRacquet &&
     yBall + radius > yPlayerRacquet) {
    xBallSpeed *= -1;
  }
}

function checkRacquetCollision2DCollider() {
  // Utiliza a biblioteca collide2D
  hit = collideRectCircle(xPlayerRacquet, 
                    yPlayerRacquet, 
                    widthPlayerRacquet, 
                    heightPlayerRacquet, 
                    xBall, 
                    yBall,
                    radius);
  
  if(hit) {
    xBallSpeed *= -1;
  }
}