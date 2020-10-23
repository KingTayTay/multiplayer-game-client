import Phaser from 'phaser'

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, id, name, hp, x = 200, y = 200) {
    super(scene, x, y, 'enemy_idle')
    scene.add.existing(this)

    this.id = id
    this.name = name
    this.hp = hp

    this.setFrame(4)
  }
}
