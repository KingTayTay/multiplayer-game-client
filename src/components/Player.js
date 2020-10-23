import Phaser from 'phaser'

export default class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, id, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this)

    this.id = id

    this.setFrame(4)
  }
}
