import ASSETS from '../assets.js';

export default class EnemyFlying extends Phaser.Physics.Arcade.Sprite {
    health = 1; // enemy health
    fireCounterMin = 100; // minimum fire rate
    fireCounterMax = 300; // maximum fire rate
    fireCounter;
    power = 1; // enemy strength

    // path coordinates for enemy to follow (right to left, horizontal gameplay)
    paths = [
        [[1330, 160], [200, 160], [200, 340], [1330, 340], [1330, 520], [200, 520]], // zig-zag horizontal
        [[1330, 200], [-50, 200], [-50, 400], [1330, 400], [1330, 600], [-50, 600]], // back and forth
        [[1330, 360], [640, 50], [100, 360], [640, 670], [1180, 360], [640, 50], [100, 360], [640, 670], [-50, 360]], // sine-style waves
        [[1330, 360], [640, 670], [100, 360], [640, 50], [1180, 360], [640, 670], [100, 360], [640, 50], [-50, 360]], // inverse sine-style waves
    ];

    constructor(scene, shipId, pathId, speed, power) {
        const points = pathId >= 0 && pathId < 4 ? this.paths[pathId] : [[1330, 200], [-50, 200]];
        const startingId = 12;
        super(scene, points[0][0], points[0][1], ASSETS.spritesheet.ships.key, startingId + shipId);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.power = power;
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax); // random firing interval
        this.setFlipX(true); // flip image horizontally to face left
        this.setDepth(10);
        this.scene = scene;

        this.initPath(pathId, speed); // choose path to follow
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.pathIndex > 1) return; // stop updating if reached end of path

        this.path.getPoint(this.pathIndex, this.pathVector); // get current coordinate based on percentage moved

        this.setPosition(this.pathVector.x, this.pathVector.y); // set position of this enemy

        this.pathIndex += this.pathSpeed; // increment percentage moved by pathSpeed

        if (this.pathIndex > 1) this.die();

        // update firing interval
        if (this.fireCounter > 0) this.fireCounter--;
        else {
            this.fire();
        }
    }

    hit(damage) {
        this.health -= damage;

        if (this.health <= 0) this.die();
    }

    die() {
        this.scene.addExplosion(this.x, this.y);
        this.scene.removeEnemy(this);
    }

    fire() {
        this.fireCounter = Phaser.Math.RND.between(this.fireCounterMin, this.fireCounterMax);
        this.scene.fireEnemyBullet(this.x, this.y, this.power);
    }

    initPath(pathId, speed) {
        const points = this.paths[pathId];

        this.path = new Phaser.Curves.Spline(points);
        this.pathVector = new Phaser.Math.Vector2(); // current coordinates along path in pixels
        this.pathIndex = 0; // percentage of position moved along path, 0 = beginning, 1 = end
        this.pathSpeed = speed; // speed of movement

        this.path.getPoint(0, this.pathVector); // get coordinates based on pathIndex

        this.setPosition(this.pathVector.x, this.pathVector.y);
    }

    getPower() {
        return this.power;
    }

    remove() {
        this.scene.removeEnemy(this);
    }
}
