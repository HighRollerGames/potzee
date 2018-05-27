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

    playerGlow(currentPlayer) {
        const td = this.headRow.querySelectorAll('td');
        td[currentPlayer].style.color = 'blue';
    }

    playerUnglow(currentPlayer) {
        const td = this.headRow.querySelectorAll('td');
        td[currentPlayer].style.color = 'black';
    }

    // constructor(players, currentPlayer, ScoringSystem, nextTurn, rollButton, turn, startRound) {
    //     this.players = players;
    //     this.currentPlayer = currentPlayer;
    //     this.ScoringSystem = ScoringSystem;
    //     this.nextTurn = nextTurn;
    //     this.rollButton = rollButton;
    //     this.turn = turn;
    //     this.startRound = startRound;
    // }

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
            // Players.length is +1 to account for the scoreChoices
            for(let j = 0; j < this.players.length + 1; j++) {
                const td = row.insertCell();
                if(j === 0) {
                    td.textContent = scoreChoices[i];
                    td.classList.add('choices');
                }
                else {
                    td.id = 'player-' + j + '-score-' + i;
                    // console.log('td listen', this.tdListener);
                    td.addEventListener('click', this.tdListener);
                }
                row.appendChild(td);
            }
            this.body.appendChild(row);
        }
    }

    renderFoot() {
        for(let i = 0; i < this.players.length + 1; i++) {
            this.totalsTd[i] = this.feet[0].insertCell();
            this.totalsTd[i].classList.add('totals');
            if(i === 0) {
                this.totalsTd[i].textContent = 'Totals';
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