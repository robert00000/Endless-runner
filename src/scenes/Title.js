class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }
    preload(){
        //images and sounds go here.
        this.load.image ('background','./assets/Starterbg.png')
    }
    create() {
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#2F4F4F',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.scene.start('playScene');  
    }

    update() {
        // check for UP input
        // if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
        //     // start next scene
        //     this.scene.start('playScene');
        // }
    }
}