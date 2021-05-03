class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        //this.load.image('Player', './assets/Knightp1.png');
        this.load.image('Enemy','./assets/Wizard.png');
        this.load.image('Sword', './assets/Sword.png');
        this.load.image('Boulder', './assets/Rock2.png')
        this.load.image('OPsword', './assets/Spell1.png');
        this.load.image('Spear', './assets/Spell2.png');

        this.load.spritesheet('Player', './assets/KnightAnim2.png', {frameWidth: 71, frameHeight: 81, startFrame: 0, endFrame: 14});
        
    }
//Make player 2 as well as add some kind of music.

    create() 
    {   
        //This is the create function which creates the playScene for the player.

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        // some variables
        this.ballVelocity = 300;
        this.boulderVelocity = 100;
        this.background = this.add.tileSprite(0, 0, 640, 960, 'background').setOrigin(0, 0);
        
        this.theEnemy = this.add.sprite(240,640, 'Enemy');
        

        // note that scaling the sprite affects the relative position of the physics body
        this.boulder = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5),'Boulder').setOrigin(0.5);
        this.boulder.body.setVelocityX(-60);
        this.boulder.body.onCollide = true;
        this.boulder.body.setSize(10,10);


        //Physics object for the boulder
        this.boulder2 = this.physics.add.sprite(widthSpacer*2, 100*getRandomInt(1,5), 'Boulder').setOrigin(0.5);
        this.boulder2.body.setVelocityX(-60);
        this.boulder2.body.onCollide = true;
        this.boulder2.body.setSize(10,10);

        this.enemy = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'OPsword');
        //Physics body for one of the attacking objects.
        this.enemy.body.setVelocityX(-500);
        this.enemy.body.onCollide = true; // must be set for collision event to work
        this.enemy.body.setSize(50, 20);

        //Physics object for the spear
        this.spear = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Spear');
        this.spear.body.setVelocityX(-450);
        this.spear.body.onCollide = true;
        this.spear.body.setSize(165,50);
        //Physics object for the boulder
        
       
        this.sword = this.physics.add.sprite(widthSpacer/2, 700, 'Sword');
        this.sword.body.setSize(100,100);
        

        
        this.player = this.physics.add.sprite(50, 100, 'Player').setOrigin(0.5);
        this.player.body.onCollide = true;      // must be set for collision event to work
        this.player.body.onWorldBounds = true;  // ditto for worldbounds
        this.player.body.onOverlap = true;      // ditto for overlap
        this.player.setDebugBodyColor(0xFFFF00);
        this.player.setCollideWorldBounds(true);

        //Knight animations
        this.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('Player', {start: 0, end: 14}),
            frameRate: 20,
            repeat: -1
        });

        // info text
        //this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        

        
        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });


        let scoreConfig = 
        {
        fontFamily: 'Courier',
        fontSize: '28px',
        color: '#FEFEFE',
        align: 'right',
        padding: {
          top: 5,
          bottom: 5,
        },
        fixedWidth: 100
        }

        // this.scoreRight = this.add.text(471, 54, this.p2Score, scoreConfig);
        scoreConfig.color = "#FF0000";
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;

        //creating play clock
        this.clock = this.time.delayedCall(startDate, () => {}, null, this); 

        //creates timer display
        //scoreConfig.color = "#843605";
        this.timer = this.add.text(game.config.width/2, 72, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0.5);
        


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

        

        
    }

  
    
    
    update(){
        this.moveSprite();
        this.moveText();
        
        //updates timer
        this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());
        //play animations
        this.player.anims.play('running', true);

        //The speed for the background.
        this.background.tilePositionX += 1;
        // check collisions
        if(this.physics.collide(this.player, this.enemy)){
            this.sound.play('hurt sfx');
            time += this.clock.getElapsedSeconds();
            this.scene.start('gameOverScene');
        }
        if(this.physics.collide(this.player, this.spear)){
            this.sound.play('hurt sfx');
            time += this.clock.getElapsedSeconds();
            this.scene.start('gameOverScene');
        }
        if(this.physics.collide(this.player, this.boulder)){
            this.sound.play('hurt sfx');
            time += this.clock.getElapsedSeconds();
            this.scene.start('gameOverScene');
        }
        if(this.physics.collide(this.player, this.boulder2)){
            this.sound.play('hurt sfx');
            this.scene.start('gameOverScene');
        }
        //When these objects collide it can reset their positions and create a new image.
        if(this.physics.collide(this.sword, this.enemy)){
            this.sound.play('enemycollision');
            this.resetEnemy();
            this.hideWeapon();
            this.moveSprite();
            // this.resetWeapon();
        }
        if(this.boulder2.x <= 0){
            this.resetBoulder2();
        }
        if(this.boulder.x <= 0){
            this.resetBoulder();
        }
        if(this.enemy.x <= 0){
            this.moveSprite();
            this.resetEnemy();
            
        }
        if(this.spear.x <= 0){
            this.resetSpear();
        }
        
        if(this.sword.x >= game.config.width + borderPadding){
            this.hideWeapon();
            
            // this.resetWeapon();
        }

        // check overlaps
        //Experimental left and right movement.
        // player input
        // if(cursors.left.isDown) {
        //     this.player.body.setVelocityX(-this.ballVelocity);
        // } else if(cursors.right.isDown) {
        //     this.player.body.setVelocityX(this.ballVelocity);
        // } else {
        //     this.player.body.setVelocityX(0);
        // }
        
        
        
        
         if(cursors.up.isDown) {
            this.player.body.setVelocityY(-500);
            //this.checkMovement();
        } else if(cursors.down.isDown) {
             this.player.body.setVelocityY(500);
             //this.checkMovement();
        } 
         else if(keyF.isDown){
            this.sound.play('sword sfx');
            this.resetWeapon();
            this.checkMovement();
            
            weaponCheck = true;
            this.sword.body.setVelocityX(600);
        }
        else {
             this.player.body.setVelocityY(0);
             this.sword.body.setVelocityY(0);
         }
         
    }
    //Could possibly randomize sprites positions.

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    resetEnemy(){
        this.enemy.x = widthSpacer*5;
        this.enemy.y = 100*this.getRandomInt(1,5);
        this.enemy.body.setVelocityX(-500);
    }
    resetSpear(){
        this.spear.x = widthSpacer*5;
        this.spear.y = 100*this.getRandomInt(1,5);
        this.spear.body.setVelocityX(-600);
    }
    resetBoulder(){
        this.boulder.x = widthSpacer*5;
        this.boulder.y = 100*this.getRandomInt(1,5);
        this.boulder.body.setVelocityX(-60);
    }
    //Resets the player weapon.
    resetWeapon(){
        this.sword.x = this.player.x;
        this.sword.y = this.player.y;
        this.sword.body.setVelocityX(0);
        weaponCheck = false;
    }
    resetBoulder2(){
        
        this.boulder2.x = widthSpacer*5;
        this.boulder2.y = 100*this.getRandomInt(1,5);
        this.boulder2.setVelocityX(-60);
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
            y: this.spear.y,
            x: 600,
            //duration: 500,
            ease: 'Power2',
            
        });
        
    }
    moveText(){
        this.tweens.add({
            targets: this.clock.getElapsedSeconds(),
            y: 200,
            x: 300,
            duration: 500,
            ease: 'Power2',
            
        });
    }
    
}
