class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload(){
        //images and sounds go here.
        this.load.image ('background','./assets/ERBackground.png')
    }
    create() {
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
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        var text1 = this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Welcome to Prototype game', menuConfig).setOrigin(0.5);
        text1.setTint(0xff0000);
        this.add.text(game.config.width/2, game.config.height/2, 'Use UP & DOWN arrows keys to move & (F) to fire', textConfig).setOrigin(0.5);
      
      
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press the R key to start the game', textConfig).setOrigin(0.5);
        
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        highScore = 0;
        // title text tween
        // this.tweens.add({
        //     targets: title01,
        //     duration: 2500,
        //     angle: { from: -1, to: 1 },
        //     yoyo: true,
        //     repeat: -1,
        //     onYoyo: function() {
        //         this.cameras.main.shake(100, 0.0025);
        //     },
        //     onYoyoScope: this
        // });
        // this.tweens.add({
        //     targets: title02,
        //     duration: 2500,
        //     angle: { from: 1, to: -1 },
        //     yoyo: true,
        //     repeat: -1,
        //     onRepeat: function() {
        //         this.cameras.main.shake(100, 0.0025);
        //     },
        //     onRepeatScope: this
        // });
    }

    update() {
        if (keyR.isDown) {
            let textureManager = this.textures;
            // take snapshot of the entire game viewport
            // https://newdocs.phaser.io/docs/3.54.0/Phaser.Renderer.WebGL.WebGLRenderer#snapshot
            // .snapshot(callback, type, encoderOptions)
            this.game.renderer.snapshot((image) => {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', image);
            });
            
            // start next scene
            this.scene.start('playScene');
        }
        
    }
}