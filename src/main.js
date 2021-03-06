//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// Knight Runner      
//Date completed: 5/3/21
//Creative tilt:
//An intersting thing inside the game was the implementation of an attack in which allows the player to
//shoot a projectile at certain attacks.To add difficulty not all spells or obstacles can be countered.
//Also there is a wizard that appears when spells are cast using tweening effects.
//The game keeps track of the time the player survives.
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
    scene: [ Title, Play, GameOver, Credits]
    
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT, xPosition,yPosition, keyUP, keyDOWN, KeyE;
let character = null;
let centerX = game.config.width/2, centerY = game.config.height/2;
let playerX = 5, playerY;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;


let highScore;
let newHighScore = false;
let widthSpacer = game.config.width/5;
let halfHeight = game.config.height/2;
let swap = null;
let cursors = null;
let weaponCheck = false;
let music;
let enemyGroup = null;
let time = 0;

let startDate = new Date();
let endDate = new Date();

