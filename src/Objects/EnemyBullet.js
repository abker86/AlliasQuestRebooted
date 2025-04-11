import ASSETS from '../assets.js';

export default class EnemyBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 200;

    constructor(scene, x, y, power) {
        const tileId = 11;
        super(scene, x, y, ASSETS.spritesheet.tiles.key, tileId + power);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.power = power;
        this.setSize(24, 16); // adjusted hitbox for horizontal bullet
        this.setFlipX(true); // flip image horizontally to face left
        this.setDepth(10);
        this.scene = scene;
        this.setVelocityX(-this.moveVelocity * power * 0.5); // bullet horizontal speed to the left
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.checkWorldBounds();
    }

    getPower() {
        return this.power;
    }

    // is this bullet outside the screen on the left?
    checkWorldBounds() {
        if (this.x < 0) {
            this.die();
        }
    }

    die() {
        this.scene.removeEnemyBullet(this);
    }
}
