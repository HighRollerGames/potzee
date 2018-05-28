/* globals scoreChoices */
/* exported Player */

class Player {
    constructor(name, currentRoll) {
        this.name = name;
        this.currentRoll = currentRoll;
        this.score = 0;
        this.potzee = false;
        this.completedChoices = [];
        for(let i = 0; i <= scoreChoices.length; i++) {
            if(i !== 6) {
                this.completedChoices.push(-1);
            }
        }
    }
}