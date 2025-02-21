class BulletArcadeGroup extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y, aliensArcadeGroup, collisionCallback)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y, aliensArcadeGroup, collisionCallback);
            this.scene.physics.world.enable(bullet);
        }
    }
}
