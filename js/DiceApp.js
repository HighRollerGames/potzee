/* globals GameDice */
/* exported DiceApp */

const gameAppTemplate = document.getElementById('dice-template');

class DiceApp {
    constructor() {
        this.GameDice = [];
    }

    addScoreApp(scoreApp) {
        this.scoreApp = scoreApp;
    }

    reset() {
        for(let i = 0; i < 5; i++) {
            this.GameDice[i].hold = false;
        }
    }

    update() {
        for(let i = 0; i < 5; i++) {
            if(!this.GameDice[i].hold) {
                this.GameDice[i].randomize();
            }
        }
    }

    render() {
        this.dom = gameAppTemplate.content;
        this.diceImg = this.dom.querySelectorAll('img');

        for(let i = 0; i < 5; i++) {
            this.GameDice[i] = new GameDice(this.diceImg[i], this.dom);
            this.GameDice[i].render();
        }

        return this.dom;
    }
}