import * as Phaser from "phaser";
import GameScene from "./scenes/game";
import RootScene from "./scenes/root";

const config = {
  type: Phaser.WEBGL,
  transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  scene: [RootScene, GameScene],
};

window.addEventListener("load", () => {
  new Phaser.Game(config);
});
