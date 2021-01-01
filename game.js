
let graphics;
let loop;
let fps = 1000/60;
let player1;
let player2;
let ball;
let highscore = 5;
let resourcesToLoad = 0;
let resources = [
    { id: "player-1", var: window.document.createElement("audio"), file: "assets/player-1.mp3" },
    { id: "player-2", var: window.document.createElement("audio"), file: "assets/player-2.mp3" },
    { id: "rebound", var: window.document.createElement("audio"), file: "assets/rebound.mp3" },
    { id: "score", var: window.document.createElement("audio"), file: "assets/score.mp3" },
 ];

window.onload = function() {
    console.log('pong onload');
    graphics = new Fx('canvas');
    player1 = new Paddle(1,graphics);
    player2 = new Paddle(2,graphics);
    ball = new Ball(graphics);
    graphics.setCanvasToPageSize();
    addEventListener('mousemove', mouseMove);
    loadResources();
}

window.onresize = function() {
    graphics.setCanvasToPageSize();
    init();
}

function start() {
    init();
    loop = setInterval(update, fps);
}

function update() {
    move();
    draw();
}

function init() {
    ball.init();
    player1.init();
    player2.init();
}

function draw() {
    let gradient = graphics.createTwoColorGradient(
        "#4c5c96","#1bafdb",0,0,0,graphics.height() * 0.66);

    graphics.fillCanvas(gradient);
    graphics.stroke(graphics.width()/2,0,
        graphics.width()/2,graphics.height(), "#ffffff",10,[20,10]);
    graphics.printText(player1.score,graphics.width()/2 - 120, 150, "150px","Arial", "#ffffff");
    graphics.printText(player2.score,graphics.width()/2 + 35, 150, "150px","Arial", "#ffffff");
    ball.draw();
    player1.draw();
    player2.draw();
}

function move() {
    ball.move();
    ball.collisions(player1,player2);
    checkScore();
    player2.move(ball);
}

function mouseMove(event) {
    player1.moveWithMouse(event);
}

function checkScore() {
    if ( player1.score >= highscore || player2.score >= highscore ) {
        gameOver();
    }
}

function startGame() {
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    let gameOver = document.getElementById("game-over");
    startDiv.style.display = "none";
    gameCanvas.style.display = "block";
    gameOver.style.display = "none";
    start();
}

function gameOver() {
    let startDiv = document.getElementById("start");
    let gameCanvas = document.getElementById("canvas");
    let gameOver = document.getElementById("game-over");
    startDiv.style.display = "none";
    gameCanvas.style.display = "none";
    gameOver.style.display = "block";

    ball.reset();
    player1.reset();
    player2.reset();

    clearInterval(loop);
}

function launchIfReady() {
    resourcesToLoad--;
    if (resourcesToLoad == 0) {
        let startDiv = document.getElementById("start");
        let gameCanvas = document.getElementById("canvas");
        let gameOver = document.getElementById("game-over");
        startDiv.style.display = "block";
        gameCanvas.style.display = "none";
        gameOver.style.display = "none";
    }
}

function beginLoadingAudio(audioVar, fileName) {
    audioVar.src = fileName;
    audioVar.addEventListener('ended', launchIfReady());
}

function loadResources() {
    resourcesToLoad = resources.length;
    for (let i = 0; i < resources.length; i++) {
        if (resources[i].var != undefined) {
            this.beginLoadingAudio(resources[i].var, resources[i].file);
        }
    }
}
