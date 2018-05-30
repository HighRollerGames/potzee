/* globals scoreChoices */
/* exported ScoreCard */

const scoreTemplate = document.getElementById('score-template');

class ScoreCard {
    constructor(tdListener, players) {
        this.tdListener = tdListener;
        this.players = players;
        this.totalsTd = [];
    }

    updateTotals() {
        for(let i = 1; i < this.players.length; i++) {
            this.totalsTd[i].textContent = this.players[i].score;
        }
    }

    updateTopTotals(currentPlayer) {
        let playerNow = this.players[currentPlayer];
        let tempScore = 0;
        let row = document.getElementById('top-totals');
        let td = row.querySelectorAll('td');
        for(let i = 0; i < 6; i++) {
            if(parseInt(playerNow.completedChoices[i]) > 0) {
                tempScore += playerNow.completedChoices[i];
            }
        }
        if(tempScore >= 63 && !playerNow.topBonus) {
            playerNow.score += 35;
            playerNow.topBonus = true;
            td[currentPlayer].classList.add('score-glow');
        }
        td[currentPlayer].textContent = tempScore;
    }

    updatePotzee(currentPlayer) {
        let row = this.body.querySelectorAll('tr');
        let td = row[12].querySelectorAll('td');
        td[currentPlayer].classList.add('potzee-glow');
    }

    updateDoublePotzee(currentPlayer) {
        let row = this.body.querySelectorAll('tr');
        let td = row[12].querySelectorAll('td');
        td[currentPlayer].classList.add('double-potzee-glow');
    }

    checkPossibleScores(currentPlayer, scoreType, score, newTurn) {
        const row = this.body.querySelectorAll('tr');
        const tempTd = row[scoreType].querySelectorAll('td');
        if(newTurn && this.players[currentPlayer].completedChoices[scoreType] < 0) {
            tempTd[currentPlayer].classList.toggle('possible-score');
            tempTd[currentPlayer].classList.toggle('clear-possible-score');
        }
        if(score <= 0) {
            tempTd[currentPlayer].textContent = '';
        }
        else {
            tempTd[currentPlayer].textContent = score;
        }
    }

    clearPossibleScores(currentPlayer, scoreType) {
        const row = this.body.querySelectorAll('tr');
        const tempTd = row[scoreType].querySelectorAll('td');
        if(this.players[currentPlayer].completedChoices[scoreType] < 0) {
            tempTd[currentPlayer].classList.toggle('clear-possible-score');
            tempTd[currentPlayer].classList.toggle('possible-score');
            tempTd[currentPlayer].textContent = '';
        }
    }

    checkPlayerFinished(currentPlayer) {
        return this.players[currentPlayer].completedChoices.filter(a => a >= 0).length === 13;
    }

    winnerGlow(winner) {
        const footTd = this.footRow.querySelectorAll('td');
        footTd[winner].classList.toggle('winner');
    }

    playerGlow(currentPlayer) {
        const row = this.body.querySelectorAll('tr');
        for(let i = 0; i < scoreChoices.length; i++) {
            const tempTd = row[i].querySelectorAll('td');
            if(i !== 6) {
                tempTd[currentPlayer].classList.toggle('current-player');
            }
        }
    }

    playerUnglow(currentPlayer) {
        const row = this.body.querySelectorAll('tr');
        for(let i = 0; i < scoreChoices.length; i++) {
            const tempTd = row[i].querySelectorAll('td');
            if(i !== 6) {
                tempTd[currentPlayer].classList.toggle('current-player');
            }
        }
    }

    renderHead() {
        for(let i = 1; i < this.players.length; i++) {
            const td = this.headRow.insertCell(-1);
            td.id = 'player-' + i;
            td.textContent = this.players[i].name;
        }
    }

    renderBody() {
        for(let i = 0; i < scoreChoices.length; i++) {
            const row = this.body.insertRow(0);
            row.id = 'score-choice-' + i;
            if(i === 6) {
                row.id = 'top-totals';
            }
            // Players.length is +1 to account for the scoreChoices
            for(let j = 0; j < this.players.length; j++) {
                const td = row.insertCell();
                if(j === 0) {
                    td.textContent = scoreChoices[i];
                    if(i !== 6) {
                        td.classList.add('choices');
                    }
                }
                else {
                    td.id = 'player-' + j + '-score-' + i;
                    td.classList.add('player-choice');
                    if(i !== 6) {
                        td.classList.add('clear-possible-score');
                    }
                    td.addEventListener('click', this.tdListener);
                }
                if(i === 6 && j !== 0) {
                    td.textContent = 0;
                }
                row.appendChild(td);
            }
            this.body.appendChild(row);
        }
    }

    renderFoot() {
        for(let i = 0; i < this.players.length; i++) {
            this.totalsTd[i] = this.feet[0].insertCell();
            if(i === 0) {
                this.totalsTd[i].textContent = 'Total';
            } else {
                this.totalsTd[i].id = 'total-' + i;
                this.totalsTd[i].textContent = this.players[i].score;
            }
        }
    }

    render() {
        this.dom = scoreTemplate.content;
        this.table = this.dom.querySelector('table');
        this.head = this.table.querySelector('thead');
        this.headRow = this.head.querySelector('tr');
        this.body = this.table.querySelector('tbody');
        this.footRow = this.table.querySelector('tfoot');
        this.feet = this.footRow.querySelectorAll('tr');

        this.renderHead();
        this.renderBody();
        this.renderFoot();

        return this.dom;
    }
}