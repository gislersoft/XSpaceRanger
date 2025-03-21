class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'laser');
    }

    fire (x, y, aliensArcadeGroup, collisionCallback)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;

        this.setVelocityY(-3000);
        this.setScale(0.2);

        this.scene.physics.add.collider(this,  aliensArcadeGroup, (self, bicho)=>{
            var originalBugTint = bicho.tint;
            bicho.tint = 0xff0000;
            self.setActive(false);
            self.setVisible(false);
            self.setVelocityY(0);
            self.body.enable = false;
            this.hitTimer = this.scene.time.delayedCall(50, () => {
                bicho.tint = originalBugTint;
                bicho.setVisible(false);
                bicho.setActive(false);
                collisionCallback();
            }, [], this.scene);
        });
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
