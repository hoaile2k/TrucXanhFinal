import { Label } from "../core/Label.js";
import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";

export class Coin extends Node {
    constructor(index) {
        super()
        this.index = index
        this.value = null
        this._createSprite()
    }
    _createSprite() {
        this.sprite = new Sprite()
        this.sprite.width = 150
        this.sprite.height = 150
        this.sprite.zIndex = 1
        this.sprite.elm.style.objectFit = "revert"
        this.addChild(this.sprite)
    }
    setValue(value) {
        this.value = value
        this.sprite.path = `./images/trucxanh${this.value}.jpg`
    }
}