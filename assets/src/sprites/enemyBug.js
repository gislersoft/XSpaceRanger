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
    
    spawn (x, y, nave)
    {
        this.originalSpaceShipTint = this.tint;
        console.log(x,y);
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setPosition(Phaser.Math.Between(0, 799),40);
        this.xTarget = Phaser.Math.Between(0, 799);
        this.calculateVelocity();

        this.setVelocityY(300);

        this.setScale(0.2);

        this.scene.physics.add.collider(this,  nave, ()=>{
            nave.tint = 0xff0000;
            this.hitTimer = this.scene.time.delayedCall(100, () => {
                nave.tint = this.originalSpaceShipTint;
                this.destroy();
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
        if (this.y > 630) {
            this.y = -40;
        }
        super.preUpdate(time, delta);
    }
}
