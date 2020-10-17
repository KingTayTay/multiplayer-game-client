import { forEach, has } from 'lodash/fp'
import Player from '../components/Player'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })

    this.id = undefined
    this.channelId = undefined
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
    this.load.spritesheet('player', 'assets/player.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }

  create() {
    this.channel.on('SERVER_UPDATE_PLAYER_ADDED', ({ id, channelId }) => {
      this.id = id
      this.channelId = channelId
    })

    this.channel.on('SERVER_UPDATE_PLAYER_REMOVED', ({ id }) => {})

    this.channel.on('SERVER_UPDATE', (updates) => {
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
      })(updates)
    })

    this.channel.emit('PLAYER_ADD')

    const keyA = this.input.keyboard.addKey('A')
    keyA.on('down', this.onKeyDownA)
    keyA.on('up', this.onKeyUpA)

    const keyD = this.input.keyboard.addKey('D')
    keyD.on('down', this.onKeyDownD)
    keyD.on('up', this.onKeyUpD)
  }

  update() {}

  // Custom
  onKeyDownA(event) {
    console.log('move left')
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
