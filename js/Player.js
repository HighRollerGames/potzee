/* globals scoreChoices */
/* exported Player */

class Player {
    constructor(name) {
        this.name = name;
        this.score = 0;
        this.potzee = false;
        this.finished = false;
        this.completedChoices = [];
        for(let i = 0; i <= scoreChoices.length; i++) {
            if(i !== 6) {
                this.completedChoices.push(-1);
            }
        }
    }
}