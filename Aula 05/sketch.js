let width = 800;
let height = 600;

// ***** variáveis para a raquete do jogador ********************************** //
let widthPlayerRacquet = 15;
let heightPlayerRacquet = 150;

let xPlayerRacquet = 5;
let yPlayerRacquet = (height / 2) - (heightPlayerRacquet / 2);

let yPlayerRacquetSpeed = 5;
// **************************************************************************** //

// ***** variáveis para a raquete do inimigo ********************************** //
let widthEnemyRacquet = 15;
let heightEnemyRacquet = 150;

let xEnemyRacquet = width - widthEnemyRacquet - 5;
let yEnemyRacquet = (height / 2) - (heightEnemyRacquet / 2);

let yEnemyRacquetSpeed = 5;

let enemySpeedDiscount = randomInt(50, 100);
// **************************************************************************** //

// ***** variáveis para a bolinha ********************************************* //
let xBall = width / 2;
let yBall = height / 2;

let diameter = 30;
let radius = diameter / 2;

/*
* Sorteia qual será o sentido em X e em Y
* O código randomInt(1, 100) gera um número aleatório entre 1 e 10
* E a expressão "% 2 == 0" verifica se o número sorteado é par
* Se for par, o valor 5 será multiplicado por -1, do contrário será multiplicado por 1
* Dessa forma nós nunca saberemos qual será a direção da bolinha
*/
let xBallSpeed = 7 * (randomInt(1, 100) % 2 == 0 ? -1 : 1);
let yBallSpeed = 7 * (randomInt(1, 100) % 2 == 0 ? -1 : 1);
// **************************************************************************** //

// Indica se a bolinha colidiu com as raquetes
let hitPlayerRacquet = false;
let hitEnemyRacquet = false;

// Pontuação
let playerPoints = 0;
let enemyPoints = 0;

// Sons
let collideSound;
let pointSound;
let backgroundSound;

let cores = {
  "preto": 0,
  "branco": 255
}

function preload() {
  collideSound = loadSound("raquetada.mp3");
  pointSound = loadSound("ponto.mp3");
  backgroundSound = loadSound("trilha.mp3");
}

function setup() {
  createCanvas(width, height);
  
  backgroundSound.loop();
}

function draw() {
  background(cores.preto);
  
  // Mostra os pontos
  drawPoints();
  
  // Desenhando a bolinha
  showBall();
  
  // Desenhando as raquetes
  showRacquets();
  
  // Movimentar em x e y
  moveBall();
  
  // Movimenta a raquete do jogador
  movePlayerRacquet();
  
  // Movimenta a raquete do inimigo
  moveEnemyRacquet();
  
  // Verifica se a bolinha colidiu com as bordas
  checkEdgeCollision();
  
  // Verifica se a bolinha coliciu com as raquetes
  //checkRacquetCollision();
  checkRacquetCollision2DCollider();
  
  // Verifica se deve ou não pontuar
  checkPoints();
}

function drawPoints() {
  let xPlayerScore = (width / 2) - 100;
  let xEnemyScore = (width / 2) + 100;
  
  stroke(cores.branco);
  textAlign(CENTER);
  textSize(16);  
  
  fill(color(255, 140, 0)); // Laranja
  rect(xPlayerScore - 50, 5, 100, 20);
  fill(cores.branco);
  text(`Jogador: ${playerPoints}`, xPlayerScore, 20);
  
  fill(color(255, 140, 0)); // Laranja
  rect(xEnemyScore - 50, 5, 100, 20);
  fill(cores.branco);
  text(`Inimigo: ${enemyPoints}`, xEnemyScore, 20);
  
  stroke(cores.preto);
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
    yPlayerRacquet -= yPlayerRacquetSpeed;
  } 
  // Movimenta a raquete do jogador para baixo e não deixa passar da borda
  else if(keyIsDown(DOWN_ARROW) && yPlayerRacquet + heightPlayerRacquet < height - 5) {
    yPlayerRacquet += yPlayerRacquetSpeed;
  }
}

function moveEnemyRacquet() {
  // Movimenta a raquete do inimigo para cima e para baixo respeitando as bordas 
  yEnemyRacquetSpeed = yBall - yEnemyRacquet - (heightEnemyRacquet / 2) - enemySpeedDiscount;
  
  yEnemyRacquet += yEnemyRacquetSpeed;
  
  // Movimenta até chegar na borda superior
  if(yEnemyRacquet <= 5){
    yEnemyRacquet = 5;
  }
  // Movimenta até chegar na borda inferior
  else if(yEnemyRacquet + heightEnemyRacquet >= height - 5){
    yEnemyRacquet = height - 5 - heightEnemyRacquet;
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
  
  // Evita que a bolinha escape pelas dos limites do jogo;
  if(xBall >= width || xBall <= 0){
    xBallSpeed *= -1;
  }
  if(yBall >= height || yBall <= 0){
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
  hitPlayerRacquet = collideRectCircle(xPlayerRacquet, 
                    yPlayerRacquet, 
                    widthPlayerRacquet, 
                    heightPlayerRacquet, 
                    xBall, 
                    yBall,
                    radius);
  
  hitEnemyRacquet = collideRectCircle(xEnemyRacquet, 
                    yEnemyRacquet, 
                    widthEnemyRacquet, 
                    heightEnemyRacquet, 
                    xBall, 
                    yBall,
                    radius);
  
  if(hitPlayerRacquet || hitEnemyRacquet) {
    xBallSpeed *= -1;
    
    randomEnemySpeedMultiplier();
    
    collideSound.play();
  }
}

function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function randomEnemySpeedMultiplier() {
  // Faz com que a dificuldade seja manipulável e aleatória
  enemySpeedDiscount = randomInt(80, 100);
}

function checkPoints() { 
  if(xBall >= width - 15){
    playerPoints += 1;
    
    pointSound.play();
  }
  
  if(xBall <= 15){
    enemyPoints += 1;
    
    pointSound.play();
  }
}