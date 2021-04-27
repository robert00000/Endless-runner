//collision objects that players have to destroy or dodge
// This is a pull from the repo.
class Projectile extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 1;
    }
    update(){
        // move projectile left
        this.x -= this.moveSpeed*2;
        
        // wrap around from left to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        }
    }
    reset(){
        this.x = game.config.width
    }
}