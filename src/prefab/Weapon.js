class Weapon extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this);
        this.moveSpeed = 10;
        
    }
    

    update (){
        //Controls for firing the weapon.
        if(!this.isFiring){
            this.x = xPosition;
            this.y = yPosition;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
        }
        if(this.isFiring ) {
            this.body.setVelocityX(this.ballVelocity);
        }
        if(this.x >= game.config.width + borderPadding) {
            this.reset();
        }
    }
    reset(){
        this.isFiring = false;
        this.body.setVelocityX(0);
        this.x = xPosition;
        this.y = yPosition;
    }
}