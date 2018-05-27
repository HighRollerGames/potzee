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

    checkTopSore(currentPlayer) {
        let tempScore = 0;
        for(let i = 0; i < 6; i++) {
            tempScore += currentPlayer.completedChoices[i];
        }
        if(tempscore >= 63) {
            playerScore;
        }
    }

    checkScore(index, potzee, currentRoll) {
        let score = 0;
        let roll = [];
        currentRoll.forEach(a => roll.push(a.diceValue + 1));
        switch(parseInt(index)) {
            case 0:     // 1s
                if(roll.filter(a => a === 1).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 1).reduce((b, c) => b + c));
                }
                break;
            case 1:     // 2s
                if(roll.filter(a => a === 2).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 2).reduce((b, c) => b + c));
                }
                break;
            case 2:     // 3s
                if(roll.filter(a => a === 3).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 3).reduce((b, c) => b + c));
                }
                break;
            case 3:     // 4s
                if(roll.filter(a => a === 4).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 4).reduce((b, c) => b + c));
                }
                break;
            case 4:     // 5s
                if(roll.filter(a => a === 5).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 5).reduce((b, c) => b + c));
                }
                break;
            case 5:     // 6s
                if(roll.filter(a => a === 6).length === 0) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.filter(a => a === 6).reduce((b, c) => b + c));
                }
                break;
            case 6:     // Three of a Kind
                if(roll.filter(a => roll.filter(b => b === a).length >= 3).length < 3) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.reduce((a, b) => a + b));
                }
                break;
            case 7:     // Four of a Kind
                if(roll.filter(a => roll.filter(b => b === a).length >= 4).length < 4) {
                    score = 0;
                }
                else {
                    score = parseInt(roll.reduce((a, b) => a + b));
                }
                break;
            case 8:     // Full House
                roll.sort((a, b) => b - a);
                if(roll.filter(a => a === roll[0]).length === 2 && roll.filter(a => a === roll[4]).length === 3 || roll.filter(a => a === roll[0]).length === 3 && roll.filter(a => a === roll[4]).length === 2) {
                    score += 25;
                }
                else {
                    score = 0;
                }
                break;
            case 9:     // Small Straight
                roll = roll.filter((a, b) => {
                    return roll.indexOf(a) === b;
                });
                roll.sort((a, b) => a - b);
                if(parseInt(roll[0]) === parseInt(roll[3]) - 3) {
                    score += 30;
                }
                else {
                    score = 0;
                }
                break;
            case 10:    // Large Straight
                roll.sort((a, b) => a - b);
                if(parseInt(roll[0]) === parseInt(roll[4]) - 4) {
                    score += 40;
                }
                else {
                    score = 0;
                }
                break;
            case 11:    // Potzee
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
            case 12:    // Chance
                score = roll.reduce((a, b) => (parseInt(a) + parseInt(b)));
                break;
            default:
                console.log('something whent wong');
        }
        // Might need to return potzee too?
        // playerScore.score += score;
        return score;
    }
}