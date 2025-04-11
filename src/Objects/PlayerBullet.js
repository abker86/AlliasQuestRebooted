import ASSETS from '../assets.js';

export default class PlayerBullet extends Phaser.Physics.Arcade.Sprite {
    power = 1;
    moveVelocity = 1000;

    constructor(scene, x, y, power) {
        super(scene, x, y, ASSETS.spritesheet.tiles.key, power - 1);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setSize(32, 12); // horizontal hitbox for right-moving bullet
        this.setDepth(10);
        this.scene = scene;

        this.setVelocityX(this.moveVelocity); // move right instead of up
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.checkWorldBounds();
    }

    getPower() {
        return this.power;
    }

    checkWorldBounds() {
        if (this.x > this.scene.sys.canvas.width) {
            this.remove();
        }
    }

    remove() {
        this.scene.removeBullet(this);
    }
}
