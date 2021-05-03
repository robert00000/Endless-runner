class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload(){
        //images and sounds go here.
        this.load.image ('background','./assets/ERBackground.png');
        this.load.image('menuWizard', './assets/Wizard.png');
        this.load.audio('sfx_swordClash', './assets/sword-clash-03.wav');
        this.load.audio('sfx_spell', './assets/SpellSound.wav');
        this.load.audio('sfx_select', './assets/Select.wav');
    }
    create() {
        this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            color: '#FEFEFE',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let textConfig = {
            fontFamily: 'Arial',
            fontSize: '14px',
            color: '#FEFEFE',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        var text1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Knight Runner.', menuConfig).setOrigin(0.5);
        text1.setTint(0xff0000);
        //text2 = this.add.text(game.config.width/2, game.config.height/2, 'Use UP & DOWN arrows keys to move & (F) to fire', textConfig).setOrigin(0.5);
      
      
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press the R key to start the game\nPress E to see credits.', textConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height-200 + borderUISize + borderPadding, 'Avoid the Spells and obstacles but you can counter the swords that fly\nby pressing the F key.', textConfig).setOrigin(0.5);
        
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
        highScore = 0;
        
    }

    update() {
        this.background.tilePositionX += 1;
        if (keyR.isDown) {

            this.sound.play('sfx_select');
            //setting default time to 0 for timer
            game.settings = 
            {
                gameTimer: 1000
            }
            
            // start next scene
            this.scene.start('playScene');
        }
        if(this.keyE.isDown){
            this.sound.play('sfx_select');
            this.scene.start('Credits')
        }
        
    }
}