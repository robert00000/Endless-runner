class Control extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }
    

    update()
    {
        yPosition = this.y;
        xPosition = this.x;
        // text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
        // text2 = this.add.text(500, 10, '', { fill: '#00ff00' });
        if(keyUP.isDown && this.y >= borderUISize + this.width) {
            this.y -= this.moveSpeed;
        } 
        else if (keyDOWN.isDown && this.y <= game.config.width - borderUISize - this.height) {
           this.y += this.moveSpeed;
        }
        // this.input.mouse.disableContextMenu();

        // this.input.on('pointerup', function (pointer) {

            // if (pointer.leftButtonReleased())
            // {
            //     text2.setText('Left Button was released');
            // }
            // else if (pointer.rightButtonReleased())
            // {
            //     text2.setText('Right Button was released');
            // }
            // else if (pointer.middleButtonReleased())
            // {
            //     text2.setText('Middle Button was released');
            // }
            // else if (pointer.backButtonReleased())
            // {
            //     text2.setText('Back Button was released');
            // }
            // else if (pointer.forwardButtonReleased())
            // {
            //     text2.setText('Forward Button was released');
            // }
            
        //});
    }
}