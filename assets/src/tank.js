class Tank {

    constructor(scene) {
        this.scene = scene;
        this.speedtank;
        this.speed = 3;
        this.speedtankY = -50;
        this.timerCreateTank;
        this.timerCreateTankInitiated = false;
        this.particlesTank;
        this.timerTankParticles;
    }

    updateTank() {
        this.speedtankY = this.speedtankY + this.speed;
        this.speedtank.rotation += 0.01;
        this.speedtank.setPosition(this.speedtank.x, this.speedtankY);
        if (this.speedtankY > 620) {
            this.speedtank.destroy();
            this.initCreateTankTimer();
        }
    }

    tankCollision(callback) {
        this.speedtank.destroy();
        this.particlesTank.visible = true;
        this.timerTankParticles = this.scene.time.delayedCall(800, ()=>{
            this.particlesTank.visible = false;
        }, [],  this.scene);
        this.initCreateTankTimer();
        callback();
    }

    // Crea el sistema de particulas cuando colisiona con el tanque
    createTankParticleSystem(objectToFollow, particles) {
        var emitter;
        emitter = particles.createEmitter({
            speed: 20,
            lifespan: 30,
            scale: { start: 1, end: 5 },
            blendMode: 'ADD'
        });
        emitter.startFollow(objectToFollow);
        emitter.setScale(2.0);
        emitter.visible = false;
        return emitter;
    }

    // Crea el tanque y sus particulas
    createTank(nave, collideCallback) {
        this.speedtankY = -50;
        this.speedtank =  this.scene.physics.add.image(Phaser.Math.Between(0, 799), 60, 'speedtank');
        this.speedtank.setScale(0.1);

        this.particlesTank = this.createTankParticleSystem(nave, this.scene.add.particles('violet'));

        this.scene.physics.add.collider(nave,  this.speedtank, ()=>{
            this.tankCollision(collideCallback);
        });

        this.timerCreateTankInitiated = false;
    }

    initCreateTankTimer() {
        if (!this.timerCreateTankInitiated) {
            this.timerCreateTankInitiated = true;
            this.timerCreateTank = this.scene.time.delayedCall(Phaser.Math.Between(4000, 30000),  this.createTank, [], this.scene);
        }
    }
}
