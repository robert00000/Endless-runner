//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// *Game Title*      
//Date completed:

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Title, Play, GameOver]
    
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, xPosition,yPosition, keyUP, keyDOWN, leftClick;
let character = null;
let centerX = game.config.width/2, centerY = game.config.height/2;
let playerX = 5, playerY;
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
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;
let swap = null;
let cursors = null;
let weaponCheck = false;