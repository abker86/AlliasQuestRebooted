// Scene 2 where Allia is getting uploaded into the spaceship
export default class scene2 extends Phaser.Scene {
  constructor() {
    super('scene2');
  }

  preload() {
    this.load.image(
      'scene2image',
      new URL('../../static/assets/backgrounds/scene2image.png', import.meta.url).href
    );
  }

  init(data) {
    this.fullText = data.text || 'No story provided.';
    this.nextScene = data.nextScene || null;
  }

  create() {
    // Background
    this.add.image(0, 0, 'scene2image') 
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);
  
    // Overlay
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width * 0.9,
      this.scale.height * 0.9,
      0x000000,
      0.6
    ).setOrigin(0.5);
  
    // Text box dimensions
    const boxWidth = this.scale.width * 0.85;
    const boxHeight = this.scale.height * 0.65;
    const boxX = this.scale.width / 2;
    const boxY = this.scale.height / 2;
    const padding = 30;
    
    // Draw terminal box
    this.add.rectangle(boxX, boxY, boxWidth, boxHeight, 0x111111, 0.75)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0x00ffcc);
    
    // Create mask for the inner area
    const maskShape = this.make.graphics({ x: boxX - boxWidth / 2 + padding, y: boxY - boxHeight / 2 + padding, add: false });
    maskShape.fillStyle(0xffffff);
    maskShape.fillRect(0, 0, boxWidth - padding * 2, boxHeight - padding * 2);
    const mask = maskShape.createGeometryMask();

    // Create text
    this.textObject = this.add.text(0, 0, '', {
      fontSize: '20px',
      fontFamily: 'monospace',
      color: '#00ffcc',
      wordWrap: { width: boxWidth - padding * 2 },
      align: 'left',
      lineSpacing: 10
    }).setOrigin(0, 0);
    
    // Container that holds the text
    this.textContainer = this.add.container(
      boxX - boxWidth / 2 + padding,
      boxY - boxHeight / 2 + padding,
      [this.textObject]
    ).setMask(mask);
  
    this.currentIndex = 0;
  
    this.typingTimer = this.time.addEvent({
      delay: 68,
      callback: this.typeCharacter,
      callbackScope: this,
      loop: true
    });
  
    this.input.once('pointerdown', () => {
      this.skipToEnd();
    });
  }

  typeCharacter() {
    if (this.currentIndex < this.fullText.length) {
      this.textObject.text += this.fullText[this.currentIndex];
      this.currentIndex++;

      const maxVisibleHeight = this.scale.height * 0.65 - 60;
      const overflow = this.textObject.height - maxVisibleHeight;
      this.textObject.y = overflow > 0 ? -overflow : 0;
    } else {
      this.typingTimer.remove(false);
      this.time.delayedCall(1800, () => {
        if (this.nextScene) {
          this.scene.start(this.nextScene);
        }
      });
    }
  }

  skipToEnd() {
    this.typingTimer.remove(false);
    this.textObject.text = this.fullText;
  
    const maxVisibleHeight = this.scale.height * 0.65 - 60;
    const currentOverflow = this.textObject.height - maxVisibleHeight;
  
    this.time.delayedCall(1000, () => {
      if (currentOverflow > 0) {
        this.textObject.y = Math.max(-currentOverflow, 0);
      }
  
      if (this.nextScene) {
        this.scene.start('GameScene');
      }
    });
  }
}  