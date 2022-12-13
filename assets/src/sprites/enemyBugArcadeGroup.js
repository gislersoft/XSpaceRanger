class EnemyBugArcadeGroup extends Phaser.Physics.Arcade.Group {
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'alien',
            active: false,
            visible: false,
            classType: EnemyBug
        });
    }

    spawnEnemy (x, y, nave)
    {
        let bug = this.getFirstDead(false);

        if (bug)
        {
            bug.spawn(x, y, nave);
        }
    }
}