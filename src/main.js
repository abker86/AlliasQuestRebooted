import Phaser from 'phaser'

import MainMenu from './scenes/MainMenu.js'
import scene1 from './scenes/scene1.js'
import scene2 from './scenes/scene2.js'
import GameScene from './scenes/GameScene.js'

const config = {
  type: Phaser.AUTO,
  width: 1530,          // 👈 Your custom width
  height: 712,          // 👈 Your custom height
  parent: 'game-container',
  backgroundColor: '#000000',
  pixelArt: true,       // ✅ Add this to fix pixel lines
  scene: [MainMenu, scene1, scene2, GameScene]
}

const game = new Phaser.Game(config);

window.onload = () => {
  game.scene.start('MainMenu');
};
