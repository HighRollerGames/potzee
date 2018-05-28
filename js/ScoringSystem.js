/* globals scoreChoices */
/* exported ScoringSystem */

class ScoringSystem {

    constructor() {
    }

    render(potzee) {
        for(let i = 0; i < scoreChoices.length; i++) {
            this.checkScore(i, potzee);
        }
    }

    checkTop(num, roll) {
        if(roll.filter(a => a === num).length === 0) {
            return 0;
        }
        else if(parseInt(roll.filter(a => a === num).reduce((b, c) => b + c)) === num * 5) {
            return -1;
        }
        else {
            return parseInt(roll.filter(a => a === num).reduce((b, c) => b + c));
        }
    }

    checkScore(index, potzee, currentRoll) {
        let score = 0;
        let roll = [];
        currentRoll.forEach(a => roll.push(a.diceValue + 1));
        switch(parseInt(index)) {
            case 0:     // 1s
                score = this.checkTop(1, roll);
                break;
            case 1:     // 2s
                score = this.checkTop(2, roll);
                break;
            case 2:     // 3s
                score = this.checkTop(3, roll);
                break;
            case 3:     // 4s
                score = this.checkTop(4, roll);
                break;
            case 4:     // 5s
                score = this.checkTop(5, roll);
                break;
            case 5:     // 6s
                score = this.checkTop(6, roll);
                break;
            case 7:     // Three of a Kind
                if(roll.filter(a => roll.filter(b => b === a).length >= 3).length < 3) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.reduce((a, b) => a + b));
                }
                break;
            case 8:     // Four of a Kind
                if(roll.filter(a => roll.filter(b => b === a).length >= 4).length < 4) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.reduce((a, b) => a + b));
                }
                break;
            case 9:     // Full House
                roll.sort((a, b) => b - a);
                if(roll.filter(a => a === roll[0]).length === 2 && roll.filter(a => a === roll[4]).length === 3 || roll.filter(a => a === roll[0]).length === 3 && roll.filter(a => a === roll[4]).length === 2) {
                    score += 25;
                }
                else {
                    score = 0;
                }
                break;
            case 10:     // Small Straight
                roll = roll.filter((a, b) => {
                    return roll.indexOf(a) === b;
                });
                roll.sort((a, b) => a - b);
                if(parseInt(roll[0]) === (parseInt(roll[3]) - 3) || parseInt(roll[1]) === (parseInt(roll[4]) - 3)) {
                    score += 30;
                }
                else {
                    score = 0;
                }
                break;
            case 11:    // Large Straight
                roll = roll.filter((a, b) => {
                    return roll.indexOf(a) === b;
                });
                roll.sort((a, b) => a - b);
                if(parseInt(roll[0]) === parseInt(roll[4]) - 4) {
                    score += 40;
                }
                else {
                    score = 0;
                }
                break;
            case 12:    // Potzee
                if(roll.filter(a => roll.filter(b => b === a).length === 5).length < 5) {
                    score = 0;
                }
                else {
                    if(potzee) {
                        score = 100;
                    }
                    else {
                        score = 50;
                    }
                }
                break;
            case 13:    // Chance
                score = roll.reduce((a, b) => (parseInt(a) + parseInt(b)));
                break;
            default:
                console.log('something whent wong');
        }
        return score;
    }
}