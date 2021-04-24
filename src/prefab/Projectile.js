class Projectile extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }
    

    update (){
        if(!this.isFiring){
            this.x = xPosition;
            this.y = yPosition;
        }
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.moveSpeed = 3;
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.moveSpeed = .5
            this.reset();
        }
    }
    reset(){
        this.isFiring = false;
        this.moveSpeed = .5;
        this.x = xPosition;
        this.y = yPosition;
    }
}