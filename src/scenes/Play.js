class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('Player', './assets/PlyrStickFig.png')
        this.load.image('Enemy','./assets/WizStickFig.png')
        
        // load spritesheet
        this.load.spritesheet('explosion', './assets/pixelatedExplosion.png',{
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });

    }
//Make player 2 as well as add some kind of music.
    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.player = new Control(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Player').setOrigin(5, 1);
        this.enemy = new Enemy(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Enemy').setOrigin(0, 1);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update(){
        this.background.tilePositionX += .5;
        this.player.update();
        this.enemy.update();
    }
        
    

    

    
      
}