import { Sprite } from "./core/Sprite.js";
import { Label } from "./core/Label.js";
import { Node } from "./core/Node.js";
import { Card } from "./components/Card.js";
import { Coin } from "./components/Coin.js";

class Game extends Node {
    constructor() {
        super();
        this.scoreValue = { value: 100 }
        this._createBackground();
        this._btnPlayGame()
        this._createScore()
    }
    _init() {
        this.canClick = false
        this.onFirstCard = null
        this.onSecondCard = null
        this.cards = []
        this.countTrue = 0
        this._shuffleCards()
        this._createCards();
        this.audioStart = new Audio("./audio/christmas-ident-21090.mp3")
        this.audioWin = new Audio("./audio/audioWin.mp3")
        this.audioTrue = new Audio("./audio/audioTrue.mp3")
        this.audioLose = new Audio("./audio/audioLose.mp3")
        this.audioFalse = new Audio("./audio/audioFalse.mp3")
        this.audioOpen = new Audio("./audio/audioOpen.mp3")
        setTimeout(() => {
            this.canClick = true
        }, 5000);
    }
    _createBackground() {
        this.background = new Node()
        this.addChild(this.background)
        this.background.width = 750
        this.background.height = 600
    }
    _shuffleCards() {
        this.randomSprite = new Array(20)
        for (let index = 0; index < 20; index++) {
            this.randomSprite[index] = index % 10
        }
        // this.randomSprite.sort(()=>{
        //     return 0.5 - Math.random()
        // })
    }
    _createCards() {
        var tl = gsap.timeline();
        for (let index = 0; index < 20; index++) {
            this.card = new Card(index)
            this.card.width = 150
            this.card.height = 150
            this.card.x = 300
            this.card.y = 200
            this.card.border = "1px solid #ccf"
            this.card.opacity = 0
            this.card.setValue(this.randomSprite[index])
            this.cards.push(this.card)
            this.card.elm.addEventListener("click", this._onClickCard.bind(this, this.card))
        }

        this.fadeCards()
    }
    fadeCards() {
        for (let i = 19; i >= 0; i--) {
            this.addChild(this.cards[i]);
            TweenMax.fromTo(this.cards[i].cover, 0.2, { opacity: 0 }, {
                ease: Back.easeOut.config(6), 
                opacity: 1, 
                delay: (20 - i) * 0.1
            });
            TweenMax.fromTo(this.cards[i], 0.2, { opacity: 0 }, {
                ease: Back.easeOut.config(6), 
                opacity: 1, 
                delay: (20 - i) * 0.1
            });
            if (i == 0) {
                TweenMax.fromTo(this.cards[i], { opacity: 0 }, {
                    ease: Back.easeOut.config(6),
                    opacity: 1,
                    delay: (20 - i) * 0.1,
                    onComplete: () => { this.moveCards() }
                });
            }
        }
    }
    moveCards() {
        for (var index = 0; index < 20; index++) {
            let row = Math.floor(index / 5)
            let col = index % 5
            TweenMax.to(this.cards[index], 0.4, {
                ease: Back.easeOut.config(5),
                x: col * 150,
                y: row * 150,
                delay: index * 0.1
            });
        }
    }
    _onClickCard(card) {
        let tl = gsap.timeline()
        if (!this.canClick) { return; }
        if (card == this.onFirstCard) { return; }
        if (this.onFirstCard === null) {
            this.audioOpen.play()
            this.onFirstCard = card
            this.onFirstCard.openCard()
        }
        else {
            this.onSecondCard = card
            this.audioOpen.pause()
            this.audioOpen.play()
            card.openCard()
            console.log(this.onFirstCard.value, this.onSecondCard.value)
            if (this.onFirstCard != null && this.onSecondCard != null) { this.canClick = false }
            if (this.onFirstCard.value == this.onSecondCard.value) {
                this.onFirstCard.closeCard()
                this.onSecondCard.closeCard()
                this.canClick = false
                setTimeout(() => {
                    this.onFirstCard = null
                    this.onSecondCard = null
                    this.canClick = true
                    this.score.score += 100
                    this.countTrue += 1
                    this.audioTrue.play()
                    tl.to(this.scoreValue, 1, {
                        value: "+=100",
                        roundProps: {
                            value: 1
                        },
                        onUpdate: () => {
                            this.score.text = "Score: " + this.scoreValue.value;
                        },
                        onComplete: () => {
                            if (this.countTrue == 10) {
                                this.endGame("You are winning","win")
                                this.victoryScreen()
                                this.audioWin.play()
                            }
                        }
                    })
                }, 2000);
            }
            else {
                this.onFirstCard.hideCard(this.onFirstCard, this.onSecondCard)
                this.onSecondCard.hideCard()
                setTimeout(() => {
                    this.audioFalse.play()
                    this.onFirstCard = null
                    this.onSecondCard = null
                    this.canClick = true
                    this.score.score -= 50
                    tl.to(this.scoreValue, 1, {
                        value: "-=50",
                        roundProps: {
                            value: 1
                        },
                        onUpdate: () => {
                            this.score.text = "Score: " + this.scoreValue.value;
                        },
                        onComplete: () => {
                            if (this.scoreValue.value == 0) {
                                this.endGame("You are losing!!")
                                this.audioLose.play()
                            }
                        }
                    })

                }, 2000);
            }
        }
    }
    endGame(value,status) {
        let win = new Node();
        win.width = 750
        win.height = 600
        win.elm.style.background = "rgba(0,0,0,0.7)"
        let label = new Label();
        label.elm.innerHTML = value + "</br>Your Score: " + this.scoreValue.value
        label.width = 750
        label.elm.style.textAlign = 'center'
        label.color = "white"
        label.elm.style.top = '40%'
        label.elm.style.transform = "scale(1.5)"
        label.elm.style.transition = "3s"
        label.elm.style.color = "white"
        this.win = win
        this.label = label
        this.addChild(this.win)
        this.addChild(this.label)
        this._btnReplay(status)
    }
    _createScore() {
        this.score = new Label()
        this.addChild(this.score)
        this.score.elm.textContent = "Score: " + this.scoreValue.value
        this.score.x = -160
        this.score.y = -20
        this.score.fontSize = 28
    }
    _btnPlayGame() {
        let playGame = new Label()
        this.addChild(playGame)
        playGame.elm.textContent = "Play Game"
        playGame.x = -160
        playGame.y = 20
        playGame.cursor = "pointer"
        playGame.elm.addEventListener("click", () => {
            this._init()
            this.audioStart.play()
            playGame.display = "none"
        })
    }
    _btnReplay(status) {
        let play = new Label()
        this.addChild(play)
        play.elm.textContent = "Play Again"
        play.x = 300
        play.y = 500
        play.background = "aquamarine"
        play.elm.style.padding = "5px 10px"
        play.elm.style.borderRadius = "10px"
        play.cursor = "pointer"
        play.elm.addEventListener("click", () => {
            for (let i = 0; i < 20; i++) {
                this.removeChild(this.cards[i])
            }
            if(status == "win"){
                this.coins.forEach((element,index) => {
                    this.removeChild(this.coins[index])
                });    
            }
            play.display = "none"
            this.removeChild(this.win)
            this.removeChild(this.label)
            this.scoreValue.value = 100
            this.score.text = "Score: " + this.scoreValue.value;
            this._init()
            this.audioStart.play()

        })
    }
    victoryScreen() {
        this.coins = []
        let positionX = []
        let positionY = []
        let tl = gsap.timeline();
        for(let i = 0; i<=100; i++){
            positionX.push(i*7)
            positionY.push(i*5)
        }
        positionX.sort(()=>{
            return 0.5 - Math.random()
        })
        positionY.sort(()=>{
            return 0.5 - Math.random()
        })
        for(let i = 0; i<=100; i++){
            let coin = new Coin()
            let col = positionX[i]
            let row = positionY[i]
            coin.width = 50
            coin.height = 50
            coin.sprite.border = 0
            coin.x = col
            coin.y = row
            coin.sprite.width = 50
            coin.sprite.height = 50
            coin.sprite.elm.style.content = "url(./images/coin.png)"
            coin.scale = 0.3
            coin.sprite.elm.style.backgroundSize = "cover"
            coin.zIndex = 1000
            this.addChild(coin)
            this.coins.push(coin)
            tl.to(this.coins[i], {opacity:1,rotateY: 180, duration: 1 }, "<");
            tl.to(this.coins[i], {col:0,y:555, duration: 3 }, "<");
            
        }
        console.log(this)
    }
}
let game = new Game()
document.body.style.background = "#ccc"
game.width = 750
game.height = 600
game.x = 200
game.y = 50
game.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)"
document.body.appendChild(game.elm);
