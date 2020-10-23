import Button from '../components/Button'

export default class RootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })

    this.channel = undefined
    this.buttonTweenOut = undefined
    this.buttonTweenIn = undefined

    this.onClickPlayButton = this.onClickPlayButton.bind(this)
    this.onMouseEnterPlayButton = this.onMouseEnterPlayButton.bind(this)
    this.onMouseLeavePlayButton = this.onMouseLeavePlayButton.bind(this)
    this.onMouseDownPlayButton = this.onMouseDownPlayButton.bind(this)
  }

  init({ channel }) {
    this.channel = channel
  }

  create() {
    const { height, width } = this.game.canvas
    const button = this.add.dom(
      width / 2,
      height / 2,
      Button({
        label: 'Play',
        onClick: this.onClickPlayButton,
        onMouseEnter: this.onMouseEnterPlayButton,
        onMouseLeave: this.onMouseLeavePlayButton,
        onMouseDown: this.onMouseDownPlayButton,
      })
    )

    this.buttonTweenOut = this.tweens.add({
      paused: true,
      targets: button,
      props: {
        scale: { value: 1.1, duration: 400, ease: 'Quad.easeOut' },
      },
    })
    this.buttonTweenIn = this.tweens.add({
      paused: true,
      targets: button,
      props: {
        scale: { value: 1, duration: 400, ease: 'Bounce.easeOut' },
      },
    })
    this.buttonTweenDown = this.tweens.add({
      paused: true,
      targets: button,
      props: {
        scale: { value: 0.9, duration: 400, ease: 'Quad.easeOut' },
      },
    })
  }

  // Custom
  onClickPlayButton() {
    this.scene.start('GameScene', { channel: this.channel })
  }

  onMouseEnterPlayButton() {
    this.buttonTweenOut.resume()
  }

  onMouseLeavePlayButton() {
    this.buttonTweenIn.resume()
  }

  onMouseDownPlayButton() {
    this.buttonTweenDown.resume()
  }
}
