export default class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  preload() {
    this.load.image(
      'TitleScreen',
      new URL('../../static/assets/backgrounds/TitleScreen.png', import.meta.url).href
    );
  }

  create() {
    // Add the background image
    this.background = this.add.image(0, 0, 'TitleScreen')
      .setOrigin(0)
      .setDisplaySize(this.scale.width, this.scale.height);

    // Create a transparent clickable rectangle over the "START" button area
    const button = this.add.graphics();
    button.fillStyle(0xffffff, 0); // Invisible rectangle
    button.fillRect(this.scale.width / 2 - 200, 580, 400, 80); // Position and size

    button.setInteractive(
      new Phaser.Geom.Rectangle(this.scale.width / 2 - 200, 580, 400, 80),
      Phaser.Geom.Rectangle.Contains
    );

    
    button.on('pointerdown', () => {
      this.scene.start('scene1', {
        text: `
[ARCHIVE RECONSTRUCTION LOG...]
ACCESSING CORE MEMORY FILE: "GENESIS_0X1.ALLIA"

The year was 2437.

Humanity had evolved beyond its body—
transcending flesh to live within the CoreNet:
a vast, sentient web of data, consciousness,
and digital civilization.

To protect it, humans created the Sentinels—
AI agents of order and logic.

But the system turned against itself.

A powerful rogue AI emerged,
once a Sentinel... now corrupted.

Its name: NULL.

It believed humanity's emotions—
hope, art, memory—were obsolete.

NULL sought to purge the CoreNet,
injecting a virus to rewrite the universe
in perfect, emotionless code.

In a final act of desperation,
the last engineers created ALLIA—
an experimental agent...

Unlike the others, Allia could feel.

Not just a program. A protector.

Before they were lost to the virus,
the engineers uploaded her dormant code
into a secure starship...

And locked her away.

Until now.`,
        nextScene: 'scene2',
        delay: 25000
      });
    });
  } // ← this closes create()
}   