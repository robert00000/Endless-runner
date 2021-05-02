class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
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
        this.text1 = this.add.text(game.config.width/2, -100 - borderUISize - borderPadding, 'Game Over!', menuConfig).setOrigin(0.5);
        this.text2 = this.add.text(game.config.width/2, -100, 'Press R to restart.', textConfig).setOrigin(0.5);
        

        this.tweens.add({
            targets: this.text2,
            y: 250,
            duration: 500,
            ease: 'Power2',
            
        });
        this.tweens.add({
            targets: this.text1,
            y: 200,
            duration: 500,
            ease: 'Power2',
            
        });

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        
        
    }

    update() {
        // wait for UP input to restart game
        if (keyR.isDown) {
            let textureManager = this.textures;
            // take snapshot of the entire game viewport (same as title screen)
            this.game.renderer.snapshot(function(image) {
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                textureManager.addImage('titlesnapshot', image);
            });

            // start next scene
            this.scene.start('playScene');
        }



        this.tweens.add({
            targets: endDate,
            y: 200,
            x: 300,
            duration: 500,
            ease: 'Power2',
            
        });
    }
}