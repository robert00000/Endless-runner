class Control extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        
        

    }
    

    update()
    {

        


        yPosition = this.y;
        xPosition = this.x;
        // text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
        // text2 = this.add.text(500, 10, '', { fill: '#00ff00' });
        if(keyUP.isDown) {
            this.body.setVelocityY(-this.ballVelocity);
        } 
        else if (keyDOWN.isDown) {
            this.body.setVelocityY(this.ballVelocity);
        }
        
    }
}