// This is the main gameplay scene
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  preload() {
    //mainplayer
    // === PLAYER IDLE SPRITE ===
    this.load.spritesheet('player_idle', new URL('../../static/assets/sprites/mainplayeridle.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
});

    this.load.spritesheet('player_attack1', new URL('../../static/assets/sprites/mainplayerattacking1.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    
    this.load.spritesheet('player_attack2', new URL('../../static/assets/sprites/mainplayerattacking2.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    
    this.load.spritesheet('player_attack3', new URL('../../static/assets/sprites/mainplayerattacking3.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    
    this.load.spritesheet('player_die1', new URL('../../static/assets/sprites/mainplayerdying1.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    
    this.load.spritesheet('player_die2', new URL('../../static/assets/sprites/mainplayerdying2.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    // enemy
    this.load.spritesheet('enemy_idle', new URL('../../static/assets/sprites/enemyidle.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
      margin: 1,   
      spacing: 3
    });
    this.load.spritesheet('enemy_move', new URL('../../static/assets/sprites/enemymoving.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet('enemy_attack', new URL('../../static/assets/sprites/enemyattacking.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet('enemy_die1', new URL('../../static/assets/sprites/enemydying1.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet('enemy_die2', new URL('../../static/assets/sprites/enemydying2.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    this.load.spritesheet('enemy_die3', new URL('../../static/assets/sprites/enemydying3.png', import.meta.url).href, {
      frameWidth: 192,
      frameHeight: 192,
    });
    

  }

  create() {
    // 🔁 Create animations
    //mainplayer

    this.anims.create({
      key: 'player_idle',
      frames: this.anims.generateFrameNumbers('player_idle', { start: 0, end: 3 }),
      frameRate: 6,
      repeat: -1
    });
    
    this.anims.create({
      key: 'player_attack1',
      frames: this.anims.generateFrameNumbers('player_attack1', { start: 0, end: 15 }),
      frameRate: 12,
      repeat: 0
    });
    
    this.anims.create({
      key: 'player_attack2',
      frames: this.anims.generateFrameNumbers('player_attack2', { start: 0, end: 15 }),
      frameRate: 12,
      repeat: 0
    });
    
    this.anims.create({
      key: 'player_attack3',
      frames: this.anims.generateFrameNumbers('player_attack3', { start: 0, end: 15 }),
      frameRate: 12,
      repeat: 0
    });
    
    this.anims.create({
      key: 'player_die1',
      frames: this.anims.generateFrameNumbers('player_die1', { start: 0, end: 15 }),
      frameRate: 10,
      repeat: 0
    });
    
    this.anims.create({
      key: 'player_die2',
      frames: this.anims.generateFrameNumbers('player_die2', { start: 0, end: 15 }),
      frameRate: 10,
      repeat: 0
    });
    // Add player controls 
    // Player sprite
  this.player = this.physics.add.sprite(200, 300, 'mainplayer_idle').setScale(1).setOrigin(0.5, 0.5);
  this.player.play('mainplayer_idle');

// Movement keys
  this.cursors = this.input.keyboard.createCursorKeys(); // Arrow keys
  this.WASD = this.input.keyboard.addKeys({
    up: 'W',
    left: 'A',
    down: 'S',
    right: 'D'
});


    // enemy    
    this.anims.create({
      key: 'enemy_idle',
      frames: this.anims.generateFrameNumbers('enemy_idle', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy_move',
      frames: this.anims.generateFrameNumbers('enemy_move', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'enemy_attack',
      frames: this.anims.generateFrameNumbers('enemy_attack', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: 0,
    });

    this.anims.create({
      key: 'enemy_die1',
      frames: this.anims.generateFrameNumbers('enemy_die1', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: 0,
    });
    
    this.anims.create({
      key: 'enemy_die2',
      frames: this.anims.generateFrameNumbers('enemy_die2', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: 0,
    });
    
    this.anims.create({
      key: 'enemy_die3',
      frames: this.anims.generateFrameNumbers('enemy_die3', { start: 0, end: 15 }),
      frameRate: 6,
      repeat: 0,
    });
    

    // 🚀 Spawn enemy
    this.enemy = this.add.sprite(400, 240, 'enemy_idle')
    .setScale(1)             // or adjust if needed
    .setOrigin(0.5, .5);      // align sprite bottom to y = 300
  
  
    this.enemy.play('enemy_idle');


    // 🧠 Enemy state control
    this.enemyState = {
      isMoving: false,
      inRange: false,
      isDead: false,
    };

    // 🧪 Example death trigger (press D to kill enemy)
    this.keys = this.input.keyboard.addKeys({
      I: 'I',   // In Range
      M: 'M',   // Moving
      D: 'D',   // Die
      R: 'R'    // Reset
    });
  
    // Enemy dies when pressing D
    this.keys.D.on('down', () => {
      if (this.enemyState.isDead) return;
    
      this.enemyState.isDead = true;
    
      // Step 1: Play first death animation
      this.enemy.play('enemy_die1');
    
      // Step 2: When die1 finishes, play die2
      this.enemy.once('animationcomplete', () => {
        this.enemy.play('enemy_die2');
    
        // Step 3: When die2 finishes, play die3
        this.enemy.once('animationcomplete', () => {
          this.enemy.play('enemy_die3');
    
          // Step 4: When die3 finishes, destroy
          this.enemy.once('animationcomplete', () => {
            this.enemy.destroy(); // or explode, fade, etc
          });
        });
      });
    });
    
    // Reset to idle when pressing R
    this.keys.R.on('down', () => {
      this.enemyState = {
        isMoving: false,
        inRange: false,
        isDead: false
      };
    });
  }
  update() {
    //handel player movement based off input
    const speed = 200;
let velocityX = 0;
let velocityY = 0;

// Arrow keys
if (this.cursors.left.isDown || this.WASD.left.isDown) {
  velocityX = -speed;
} else if (this.cursors.right.isDown || this.WASD.right.isDown) {
  velocityX = speed;
}

if (this.cursors.up.isDown || this.WASD.up.isDown) {
  velocityY = -speed;
} else if (this.cursors.down.isDown || this.WASD.down.isDown) {
  velocityY = speed;
}

this.player.setVelocity(velocityX, velocityY);

// Optional: flip sprite based on direction
if (velocityX < 0) this.player.setFlipX(true);
else if (velocityX > 0) this.player.setFlipX(false);

// Optional: play animations when moving
if (velocityX !== 0 || velocityY !== 0) {
  this.player.play('mainplayer_move', true); // if you have a move animation
} else {
  this.player.play('mainplayer_idle', true);
}

    if (this.enemyState.isDead) return;
  
    // Update state flags based on key status
    this.enemyState.inRange = this.keys.I.isDown;
    this.enemyState.isMoving = this.keys.M.isDown;
  
    // Play correct animation based on state
    if (this.enemyState.inRange) {
      this.enemy.play('enemy_attack', true);
    } else if (this.enemyState.isMoving) {
      this.enemy.play('enemy_move', true);
    } else {
      this.enemy.play('enemy_idle', true);
    }
  }
}  


  
