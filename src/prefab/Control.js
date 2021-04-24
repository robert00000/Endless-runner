class Control extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }
    

    update()
    {
        position = this.x;
        // text1 = this.add.text(10, 10, '', { fill: '#00ff00' });
        // text2 = this.add.text(500, 10, '', { fill: '#00ff00' });
        if(keyLEFT.isDown && this.x >= borderUISize + this.width) {
            this.x -= this.moveSpeed;
        } 
        else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
           this.x += this.moveSpeed;
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