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
        for(let i = 0; i < this.players.length; i++) {
            this.totalsTd[i + 1].textContent = this.players[i].score;
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
            td[currentPlayer + 1].classList.add('score-glow');
        }
        td[currentPlayer + 1].textContent = tempScore;
    }

    possibleScores() {

    }

    playerGlow(currentPlayer) {
        const td = this.headRow.querySelectorAll('td');
        for(let i = 0; i < scoreChoices.length; i++) {
            const row = this.body.querySelectorAll('tr');
            const tempTd = row[i].querySelectorAll('td');
            if(i !== 6) {
                tempTd[currentPlayer].classList.add('current-player');
            }
            td[currentPlayer].classList.add('current-player');
            td[currentPlayer].classList.remove('not-current-player');
        }
    }

    playerUnglow(currentPlayer) {
        const td = this.headRow.querySelectorAll('td');
        for(let i = 0; i < scoreChoices.length; i++) {
            const row = this.body.querySelectorAll('tr');
            const tempTd = row[i].querySelectorAll('td');
            if(i !== 6) {
                tempTd[currentPlayer].classList.add('not-current-player');
            }
            td[currentPlayer].classList.add('not-current-player');
            td[currentPlayer].classList.remove('current-player');
        }
    }

    renderHead() {
        for(let i = 0; i < this.players.length; i++) {
            const td = this.headRow.insertCell(1);
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
            for(let j = 0; j < this.players.length + 1; j++) {
                const td = row.insertCell();
                if(j === 0) {
                    td.textContent = scoreChoices[i];
                    if(i !== 6) {
                        td.classList.add('choices');
                    }
                }
                else {
                    td.id = 'player-' + j + '-score-' + i;
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
        for(let i = 0; i < this.players.length + 1; i++) {
            this.totalsTd[i] = this.feet[0].insertCell();
            if(i === 0) {
                this.totalsTd[i].textContent = 'Total';
            } else {
                this.totalsTd[i].id = 'total-' + i;
                this.totalsTd[i].textContent = this.players[i - 1].score;
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