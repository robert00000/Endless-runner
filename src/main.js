//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// *Game Title*      
//Date completed:

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Title, Play, GameOver]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, KeyLeftClick, xPosition,yPosition, keyUP, keyDOWN, leftClick;

let centerX = game.config.width/2, centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
let level;
let highScore;
let newHighScore = false;
let cursors;