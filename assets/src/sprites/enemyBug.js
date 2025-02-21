class EnemyBug extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, 'alienbug');
        this.step = 0;
        this.bugSpeedMin = 2;
        this.bugSpeedLimit = 10;
        this.bugSpeed = 0;
        this.xTarget = 0;
        this.speed = 3;
        this.hitTimer = undefined;
    }

    calculateVelocity() {
        this.bugSpeed = Phaser.Math.Between(this.bugSpeedMin, this.bugSpeedLimit) / 10000;
    }

    spawn (x, y, nave, collisionCallback)
    {
        this.originalSpaceShipTint = this.tint;

        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);
        this.body.enable = true;

        this.calculateVelocity();

        this.setVelocityY(30);

        this.setScale(0.2);

        this.scene.physics.add.collider(this,  nave, (self, _)=>{
            nave.tint = 0xff0000;
            self.setVisible(false);
            self.setActive(false);
            self.body.enable = false;
            this.hitTimer = this.scene.time.delayedCall(50, () => {
                nave.tint = this.originalSpaceShipTint;
                collisionCallback();
            }, [], this.scene);
        });
    }

    preUpdate (time, delta)
    {
        this.y = this.y + this.speed;
        this.step += delta * this.bugSpeed;
        var result = Phaser.Math.Interpolation.SmoothStep(this.step, this.x, this.xTarget);
        if (result === this.xTarget) {
            this.xTarget = Phaser.Math.Between(0, 799);
            this.step = 0;
            this.calculateVelocity();
        }
        this.setPosition(result, this.y);
        // Si el bicho sale del mapa vuelve y empieza
        if (this.y > 630) {
            this.y = -40;
        }
        super.preUpdate(time, delta);
    }
}
