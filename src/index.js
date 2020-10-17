import * as Phaser from "phaser";
import { enable3d, Canvas } from "@enable3d/phaser-extension";
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
  ...Canvas(),
};

window.addEventListener("load", () => {
  enable3d(() => new Phaser.Game(config)).withPhysics("/assets/ammo");
});
