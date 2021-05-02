class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('Player', './assets/Knightp1.png');
        this.load.image('Enemy','./assets/Wizard.png');
        this.load.image('Sword', './assets/Sword.png');
        this.load.image('Spear', './assets/Spear.png');
        this.load.image('Boulder', './assets/Rock2.png')
        this.load.image('OPsword', './assets/Opposing sword.png');

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
        this.boulder = this.physics.add.sprite(widthSpacer*5, 135*getRandomInt(1,5),'Boulder');
        this.boulder.body.setVelocityX(-this.boulderVelocity-100);
        this.boulder.body.onCollide = true;
        this.boulder.body.setSize(10,10);


        //Physics object for the boulder
        this.boulder2 = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Boulder');
        this.boulder2.body.setVelocityX(-this.boulderVelocity);
        this.boulder2.body.onCollide = true;
        this.boulder2.body.setSize(50,20);

        this.enemy = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'OPsword');
        //Physics body for one of the attacking objects.
        this.enemy.body.setVelocityX(-this.ballVelocity);
        //this.enemy.body.setAngularVelocity(90);
        this.enemy.body.onCollide = true; // must be set for collision event to work
        this.enemy.body.setSize(50, 20);

        //Physics object for the spear
        this.spear = this.physics.add.sprite(widthSpacer*5, 100*getRandomInt(1,5), 'Spear');
        this.spear.body.setVelocityX(-this.ballVelocity -100);
        this.spear.body.onCollide = true;
        this.spear.body.setSize(50,20);
        //Physics object for the boulder
        
       // this.enemy.body.onCollide = true; // must be set for collision event to work


        this.sword = this.physics.add.sprite(widthSpacer/2, 700, 'Sword');
        this.sword.body.setSize(50,50)
        

        
        this.player = this.physics.add.sprite(playerX, playerY, 'Player').setOrigin(0.5);
        this.player.body.onCollide = true;      // must be set for collision event to work
        this.player.body.onWorldBounds = true;  // ditto for worldbounds
        this.player.body.onOverlap = true;      // ditto for overlap
        this.player.setDebugBodyColor(0xFFFF00);
        this.player.setCollideWorldBounds(true);
        // info text
        //this.message = this.add.text(centerX, 32, 'Awaiting physics world events...').setOrigin(0.5);
        this.add.text(centerX, game.config.height - 64, 'Use cursor keys to move up and down.').setOrigin(0.5);
        

        // create physics world events
        // note: you MUST use a .collide/.overlap check in update() AND set body.onCollide/body.onOverlap/.onWorldBounds to true for these to work
        // this.physics.world.on('collide', (obj1, obj2, body1, body2)=>{
        //     this.message.text = `${obj1.texture.key} is colliding with ${obj2.texture.key} body`;
        // });

        // this.physics.world.on('overlap', (obj1, obj2, body1, body2)=>{
        //     this.message.text = `${obj1.texture.key} body is overlapping ${obj2.texture.key} body`;
        // });

        // this.physics.world.on('worldbounds', (body)=>{
        //     this.message.text = `${body.gameObject.texture.key} touched world bounds`;
        // });

        // define cursors and S key (for Scene switching)
        cursors = this.input.keyboard.createCursorKeys();
        swap = this.input.keyboard.addKey('S');
        swap.on('down', () => {
            this.scene.start("gameOverScene");
        });


        this.p1Score = 0;
        highScore = highScore;

        let scoreConfig = 
        {
        fontFamily: 'Courier',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
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
        scoreConfig.color = "#843605";
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

        

        // // reset parameters
        // level = 0;
        // this.playerVelocity = 300;

          this.data.set('time', this.enemy.x);
        //  this.data.set('level', this.enemy.y);
        //  this.data.set('score', highScore);

        
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
        this.moveText();
        //updates timer
        this.timer.text = (game.settings.gameTimer / 1000) + Math.floor(this.clock.getElapsedSeconds());


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
        if(this.physics.collide(this.player, this.boulder2)){
            this.scene.start('gameOverScene');
        }
        //When these objects collide it can reset their positions and create a new image.
        if(this.physics.collide(this.sword, this.enemy)){
            this.resetEnemy();
            this.hideWeapon();
            this.moveSprite();
            // this.resetWeapon();
        }
        if(this.boulder2.x <= 0){
            this.resetBoulder2;
        }
        if(this.boulder.x <= 0){
            this.resetBoulder;
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

        // player input
        // if(cursors.left.isDown) {
        //     this.player.body.setVelocityX(-this.ballVelocity);
        // } else if(cursors.right.isDown) {
        //     this.player.body.setVelocityX(this.ballVelocity);
        // } else {
        //     this.player.body.setVelocityX(0);
        // }
        
        
        
        
         if(cursors.up.isDown) {
            this.player.body.setVelocityY(-400);
            //this.checkMovement();
        } else if(cursors.down.isDown) {
             this.player.body.setVelocityY(400);
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
        this.boulder.body.setVelocityX(-this.ballVelocity -100);
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
        this.boulder2.setVelocityX(-this.boulderVelocity);
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
