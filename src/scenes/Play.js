class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('Player', './assets/PlyrStickFig.png');
        this.load.image('Enemy','./assets/WizStickFig.png');
        this.load.image('Sword', './assets/Sword.png');
        
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

        this.input.mouse.disableContextMenu();
        //Where art assets go.
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.player = new Control(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Player').setOrigin(5, 1);
        this.enemy = new Enemy(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Enemy').setOrigin(-5, 1);
        this.weapon = new Weapon(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Sword').setOrigin(3, 1);
        this.projectile1 = new Projectile(this, game.config.width, borderUISize*6 + borderPadding*4, 'Enemy').setOrigin(0,0);
        //Where we define the keys.
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
      //  KeyLeftClick = this.input
    }
    update(){
        //The speed for the background.
        this.background.tilePositionX += .5;

        this.player.update();
        this.enemy.update();
        this.weapon.update()
        this.projectile1.update();

        //Collision checks.
        // checkCollision(player, enemy) {
        //     // simple AABB checking
        //     if (player.x < enemy.x + enemy.width && 
        //         player.x + player.width > enemy.x && 
        //         player.y < enemy.y + enemy.height &&
        //         player.height + player.y > enemy. y) {
        //             return true;
        //     } else {
        //         return false;
        //     }
        // }
        //This code Eliminates the target.
        
    }    
}