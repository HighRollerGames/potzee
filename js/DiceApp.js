/* globals GameDice */
/* exported DiceApp */

const gameAppTemplate = document.getElementById('dice-template');

class DiceApp {
    constructor() {
        this.GameDice = [];
    }

    reset() {
        for(let i = 0; i < 5; i++) {
            this.GameDice[i].hold = false;
        }
    }

    update() {
        this.GameDice[0].randomize(parseInt(prompt()));
        this.GameDice[1].randomize(parseInt(prompt()));
        this.GameDice[2].randomize(parseInt(prompt()));
        this.GameDice[3].randomize(parseInt(prompt()));
        this.GameDice[4].randomize(parseInt(prompt()));


        // for(let i = 0; i < 5; i++) {
        //     if(!this.GameDice[i].hold) {
        //         this.GameDice[i].randomize();
        //     }
        // }
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