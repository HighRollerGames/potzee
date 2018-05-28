/* globals diceNumLocations diceNumLocationsHold*/
/* exported GameDice */

class GameDice {
    constructor(diceImg, dom) {
        this.diceImg = diceImg;
        this.dom = dom;
        this.hold = false;
    }

    randomize(i) {
        // this.diceValue = parseInt(Math.random() * 6);
        this.diceValue = i;
        this.diceImg.src = diceNumLocations[this.diceValue];
    }

    render() {
        this.randomize();
        this.diceImg.addEventListener('click', (e) => {
            // HOLD DICE
            e.preventDefault();
            if(this.hold) {
                this.hold = false;
                this.diceImg.src = diceNumLocations[this.diceValue];
            }
            else {
                this.hold = true;
                this.diceImg.src = diceNumLocationsHold[this.diceValue];
            }
        });
    }
}