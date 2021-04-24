//Collaborators Robert Williams, Carey Wang and Aaron Tishler
// *Game Title*      
//Date completed:

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Title, Play]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;
