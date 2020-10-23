import Geckos from '@geckos.io/client'
import 'bulma/css/bulma.css'

export default class RootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'RootScene' })
  }

  preload() {}

  create() {
    const channel = Geckos({ port: 1444 })

    channel.onConnect((error) => {
      if (error) {
        console.error(error.message)
      }

      channel.on('ready', () => {
        console.log('ready')
        this.scene.start('MenuScene', { channel })
      })
    })

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
