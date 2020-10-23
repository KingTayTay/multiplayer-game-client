import { forEach, has } from 'lodash/fp'
import Player from '../components/Player'
import Enemy from '../components/Enemy'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this.id = undefined
    this.enemy = undefined
    this.players = {}

    this.onKeyDownA = this.onKeyDownA.bind(this)
    this.onKeyUpA = this.onKeyUpA.bind(this)
    this.onKeyDownD = this.onKeyDownD.bind(this)
    this.onKeyUpD = this.onKeyUpD.bind(this)
  }

  init({ channel }) {
    this.channel = channel
  }

  preload() {
    this.load.spritesheet('enemy_idle', 'assets/enemy/idle.png', {
      frameWidth: 38,
      frameHeight: 28,
    })
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.image('card', 'assets/card.png')
  }

  create() {
    this.channel.on('SERVER_UPDATE_PLAYER_ADDED', ({ id }) => {
      this.id = id
    })

    this.channel.on('SERVER_UPDATE_PLAYER_REMOVED', ({ id }) => {})

    this.channel.on('SERVER_UPDATE', (updates) => {
      const { players, enemy } = updates

      forEach((player) => {
        const { id, x, y } = player
        const hasPlayer = has(id, this.players)

        if (!hasPlayer) {
          const x = 200
          const y = 200
          const gameObject = new Player(this, id, x || 200, y || 200)
          gameObject.setAlpha(1)

          this.players = { ...this.players, [id]: gameObject }
        } else {
          this.players[id].setPosition(x, y)
        }
      })(players)

      const { id, name, hp } = enemy
      if (!this.enemy) {
        const gameObject = new Enemy(this, id, name, hp)
        this.enemy = gameObject
      } else {
        this.enemy.hp = hp
      }
    })

    this.channel.emit('PLAYER_ADD')

    const keyA = this.input.keyboard.addKey('A')
    keyA.on('down', this.onKeyDownA)
    keyA.on('up', this.onKeyUpA)

    const keyD = this.input.keyboard.addKey('D')
    keyD.on('down', this.onKeyDownD)
    keyD.on('up', this.onKeyUpD)

    this.add.sprite(100, 100, 'card').setOrigin(0, 0)
  }

  update() {}

  // Custom
  onKeyDownA(event) {
    this.channel.emit('PLAYER_MOVE', { x: -1 })
  }

  onKeyUpA(event) {
    this.channel.emit('PLAYER_MOVE', { x: 0 })
  }

  onKeyDownD(event) {
    this.channel.emit('PLAYER_MOVE', { x: 1 })
  }

  onKeyUpD(event) {
    this.channel.emit('PLAYER_MOVE', { x: 0 })
  }
}
