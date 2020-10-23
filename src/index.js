import * as Phaser from 'phaser'
import RootScene from './scenes/root'
import MenuScene from './scenes/menu'
import GameScene from './scenes/game'

const config = {
  type: Phaser.WEBGL,
  scale: {
    zoom: 1,
    mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    height: '100%',
    width: '100%',
  },
  scene: [RootScene, MenuScene, GameScene],
  parent: 'phaser',
  dom: {
    createContainer: true,
  },
}

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
