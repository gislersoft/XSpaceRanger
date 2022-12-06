class EnemyBug extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y)
    {
        super(scene, x, y, 'alienbug');
    }
    
    spawn (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        // this.setVelocityY(-3000);
        this.setScale(0.2);
    }
}
