class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('Player', './assets/Knight.png');
        this.load.image('Enemy','./assets/Wizard.png');
        this.load.image('Sword', './assets/Sword.png');
        this.load.image('Spear', './assets/Spear.png');
        this.load.image('Boulder', './assets/Rock1.png')

    }
//Make player 2 as well as add some kind of music.

    create() 
    {   
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // some variables
        this.ballVelocity = 300;

        this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        
        this.theEnemy = this.add.sprite(240,640, 'Enemy');
        // this.possessedSword = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Sword')
        // this.possessedSword.setVelocityX(-this.ballVelocity);
         //Grouping for sprites
        //var group = this.make.group();
        //enemyGroup.add(this.theEnemy);
        // enemyGroup.add(this.possessedSword);
        // enemyGroup.add(this.possessedSword);
        // enemyGroup.add(this.possessedSword);
        // enemyGroup.enableBody = true;
        // enemyGroup.physicsBodyType = Phaser.Physics.Arcade;

        // note that scaling the sprite affects the relative position of the physics body
        this.enemy = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Sword');
        //Physics body for one of the attacking objects.
        this.enemy.body.setVelocityX(-this.ballVelocity);
        this.enemy.body.setAngularVelocity(90);
        this.enemy.body.onCollide = true; // must be set for collision event to work
        //Physics object for the spear
        this.spear = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Spear');
        this.spear.body.setVelocityX(-this.ballVelocity -100);
        this.spear.body.onCollide = true;
        
        //Physics object for the boulder
        this.boulder = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5),'Boulder');
        this.boulder.body.setVelocityX(-100);
        this.boulder.body.onCollide = true;
       // this.enemy.body.onCollide = true; // must be set for collision event to work


        this.sword = this.physics.add.sprite(widthSpacer/2, 700, 'Sword');
        
        

        
        this.player = this.physics.add.sprite(playerX, playerY, 'Player').setOrigin(0.5);
        this.player.body.onCollide = true;      // must be set for collision event to work
        this.player.body.onWorldBounds = true;  // ditto for worldbounds
        this.player.body.onOverlap = true;      // ditto for overlap
        this.player.setDebugBodyColor(0xFFFF00);
        this.player.setCollideWorldBounds(true);

        // info text
        this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        

        // create physics world events
        // note: you MUST use a .collide/.overlap check in update() AND set body.onCollide/body.onOverlap/.onWorldBounds to true for these to work
        this.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
            this.message.text = `${obj1.texture.key} is colliding with ${obj2.texture.key} body`;
        });

        this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
            this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`;
        });

        this.physics.world.on('worldbounds', (body)=>{
            this.message.text = `${body.gameObject.texture.key} touched world bounds`;
        });

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });
        


        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
          }
        


        //Timer for the spawning of things.
        var timer = this.time.addEvent({
            delay: 500,                // ms
            //args: [],
            repeat: 4
        });

        

        // // reset parameters
        // level = 0;
        // this.playerVelocity = 300;

        
        // this.input.mouse.disableContextMenu();
        // //Where art assets go.
         
        // this.player = this.physics.add.sprite(game.config.width/2, game.config.height - borderUISize - borderPadding, 'Player')
        // // this.enemy = new Enemy(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Enemy').setOrigin(-5, 1);
        // //this.weapon = new Weapon(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'Sword').setOrigin(3, 1);
        // //this.projectile1 = new Projectile(this, game.config.width, borderUISize*6 + borderPadding*4, 'Enemy').setOrigin(0,0);
        
        // //Where we define the keys.
        

        // keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        // keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        // keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // //Displays information of variables found within the game.
        // //  Using the Scene Data Plugin we can store data on a Scene level
        
         this.data.set('time', this.enemy.x);
         this.data.set('level', this.enemy.y);
         this.data.set('score', highScore);

        
         var text = this.add.text(450, 1, '', { font: '16px Courier', fill: '#00ff00' });
         text.setText([
             'Y coord: ' + this.data.get('level'),
             'X coord: ' + this.data.get('time'),
             'Score: ' + this.data.get('score')
         ]);
        
        // set up difficulty timer (triggers callback every second)
        // this.difficultyTimer = this.time.addEvent({
        //     delay: 1000,
        //     callback: this.levelBump,
        //     callbackScope: this,
        //     loop: true
        // });
        
        //Game over flag
        // this.gameOver = false;
      //  For collision work on arcade physics.
        // let ball01 = this.physics.add.sprite(widthSpacer, halfHeight, 'basketball).setScale(0.5);\
        
    }

    // I've sort of figured out how to work the collision system that 
    //Phaser 3 offers which is called Arcade Physics. This allows us to check if things collide.
    update(){
        this.moveSprite();
        //The speed for the background.
        this.background.tilePositionX += 1;
        // check collisions
        if(this.physics.collide(this.player, this.enemy)){
            this.scene.start('gameOverScene');
        }
        if(this.physics.collide(this.player, this.spear)){
            this.scene.start('gameOverScene');
        }
        if(this.physics.collide(this.player, this.boulder)){
            this.scene.start('gameOverScene');
        }
        //When these objects collide it can reset their positions and create a new image.
        if(this.physics.collide(this.sword, this.enemy)){
            this.resetEnemy();
            this.hideWeapon();
            this.moveSprite();
            // this.resetWeapon();
        }
        else if(this.enemy.x <= 0){
            this.moveSprite();
            this.resetEnemy();
            
        }
        else if(this.spear.x <= 0){
            this.resetSpear();
        }
        else if(this.boulder.x <= 0){
            this.resetBoulder;
        }
        else if(this.sword.x >= game.config.width + borderPadding){
            this.hideWeapon();
            
            // this.resetWeapon();
        }

        // check overlaps

        // player input
        // if(cursors.left.isDown) {
        //     this.player.body.setVelocityX(-this.ballVelocity);
        // } else if(cursors.right.isDown) {
        //     this.player.body.setVelocityX(this.ballVelocity);
        // } else {
        //     this.player.body.setVelocityX(0);
        // }
        
        
        
        
         if(cursors.up.isDown) {
            this.player.body.setVelocityY(-this.ballVelocity);
            //this.checkMovement();
        } else if(cursors.down.isDown) {
             this.player.body.setVelocityY(this.ballVelocity);
             //this.checkMovement();
        } 
         else if(keyF.isDown){
            this.resetWeapon();
            this.checkMovement();
            
            weaponCheck = true;
            this.sword.body.setVelocityX(600);
        }
        else {
             this.player.body.setVelocityY(0);
             this.sword.body.setVelocityY(0);
         }
         



        // this.physics.collide(this.weapon, this.projectile1)

        //Player input
        // if(keyUP.isDown && this.y >= borderUISize + this.width) {
        //     this.player.body.setVelocityY(-this.playerVelocity)
        // } 
        // else if (keyDOWN.isDown && this.y <= game.config.width - borderUISize - this.height) {
        //     this.player.body.setVelocityY(this.playerVelocity)
        // }
        // else{
        //     this.player.body.setVelocityY(0)
        // }

        // if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        //     this.scene.start("Title");
        // }
        //Check for player if they are still alive. Needs to be worked on.
        // if(!this.player.destroyed){
        //     // check for player input
        //     if(cursors.up.isDown){

        //     }else if (cursors.down.isDown)
        // }
        //The speed for the background.
        //this.background.tilePositionX += .5;

        //this.player.update();
        // this.enemy.update();
        //this.weapon.update()
        //this.projectile1.update();
    }
    //Could possibly randomize sprites chosen somewhere here.

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    resetEnemy(){
        this.enemy.x = widthSpacer*5;
        this.enemy.y = 100*this.getRandomInt(1,5);
        this.enemy.body.setVelocityX(-this.ballVelocity);
    }
    resetSpear(){
        this.spear.x = widthSpacer*5;
        this.spear.y = 125*this.getRandomInt(1,9);
        this.spear.body.setVelocityX(-this.ballVelocity - 100);
    }
    resetBoulder(){
        this.boulder.x = widthSpacer*5;
        this.boulder.y = 100*this.getRandomInt(1,5);
        this.boulder.body.setVelocityX(-100);
    }
    //Resets the player weapon.
    resetWeapon(){
        this.sword.x = this.player.x;
        this.sword.y = this.player.y;
        this.sword.body.setVelocityX(0);
        weaponCheck = false;
    }
    checkMovement(){
        if(!weaponCheck){
            this.sword.y = this.player.y;
            weaponCheck = false;
        }
    }
    //function to hide weapon.
    hideWeapon(){
        this.sword.y = -200;
        this.sword.x = 0;
        this.sword.body.setVelocityY(0);
    }
    returnWeapon(){
        this.tweens.add({
            targets: this.sword,
            y: this.sword.y = this.player.y,
            x: this.sword.x = this.player.x,
            duration: 1000,
            ease: 'Power2',
            delay: 500
        });
        this.sword.body.setVelocityX(0);
    }
    moveSprite(){
        this.tweens.add({
            targets: this.theEnemy,
            y: this.enemy.y,
            x: 600,
            duration: 500,
            ease: 'Power2',
            
        });
        
    }
}
