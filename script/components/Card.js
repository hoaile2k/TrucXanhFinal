import { Label } from "../core/Label.js";
import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";

export class Card extends Node {
    constructor(index) {
        super()
        this.index = index
        this.value = null
        this._createSprite()
        this._createCover()
        this._createLabel(index)
    }
    _createLabel(index) {
        this.label = new Label()
        this.label.text = index
        this.label.x = 70
        this.label.elm.style.color = "red"
        this.label.y = 35
        this.label.cursor = "pointer    "
        this.addChild(this.label)
    }
    _createSprite() {
        this.sprite = new Sprite()
        this.sprite.width = 150
        this.sprite.height = 150
        this.sprite.zIndex = 1
        this.sprite.elm.style.objectFit = "revert"
        this.addChild(this.sprite)
    }
    _createCover() {
        this.cover = new Node()
        this.cover.width = 150
        this.cover.height = 150
        this.cover.cursor = "pointer"
        this.cover.background = "orange" 
        var tl = gsap.timeline();
        this.addChild(this.cover)
    }
    setValue(value) {
        this.value = value
        this.sprite.path = `./images/trucxanh${this.value}.jpg`
    }
    openCard() {
        var tl = gsap.timeline();
        tl.to(this.elm, { scaleX: 0, duration: 0.3 })
        tl.call(() => {
            this.cover.display = "none"
            this.label.display = "none"
        })
        tl.to(this.elm, { scaleX: 1, duration: 0.3 })
        tl.to(this.cover, { scaleX: 0, duration: 0 })
        tl.to(this.elm, { scaleX: 1, duration: 0.3 });

    }
    hideCard() {
        var tl = gsap.timeline();
        tl.delay(1.5)
        tl.to(this.elm, { scaleX: 0, duration: 0.3 })
        tl.call(() => {
            this.cover.display = "block"
            this.label.display = "block"
        })  
        tl.to(this.elm, { scaleX: 1, duration: 0.3 })

    }
    closeCard() {
        var tl = gsap.timeline();
        tl.delay(1)
        tl.to(this.elm, { scale:1.5,zIndex:20, duration: 1 })
        tl.call(() => {
            this.display = "none"
        })
        
    }
}