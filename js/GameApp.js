/* globals ScoreCard Player DiceApp ScoringSystem */
/* exported GameApp */

const scoreAppTemplate = document.getElementById('app-template');

class GameApp {
    constructor() {
        this.playerNames = JSON.parse(localStorage.getItem('players'));
        this.players = [];
        this.turn = 0;
        this.currentPlayer = 0;

        this.rollButton = document.getElementById('roll');
        this.rollButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.DiceApp.update();
            if(this.turn === 1) {
                this.rollButton.disabled = true;
                // Button will be enabled once user confirms score choice
                return;
            }
            this.turn++;
            // SAVE THIS FOR DISPLAYING POSSIBLE SCORES
            // for(let i = 0; i < scoreChoices.length; i++) {
            //     this.ScoringSystem.checkScore(i, this.players[this.currentPlayer].potzee, this.players[this.currentPlayer].currentRoll);

            // }
        });
        this.tdListener = (e) => {
            e.preventDefault();
            let tempPlayer = parseInt(e.path[0].id.split('-')[1] - 1);
            let tempScoreType = parseInt(e.path[0].id.split('-')[3]);
            let tempScore = parseInt(this.ScoringSystem.checkScore(tempScoreType, this.players[this.currentPlayer].potzee, this.players[this.currentPlayer].currentRoll, this.players[this.currentPlayer]));
            if(this.currentPlayer === tempPlayer && this.players[this.currentPlayer].completedChoices[tempScoreType] === -1) {
                if(tempScore === 50) {
                    this.players[this.currentPlayer].potzee = true;
                }
                this.turn = 0;
                this.players[this.currentPlayer].completedChoices[tempScoreType] += tempScore;
                this.players[this.currentPlayer].score += tempScore;
                e.path[0].textContent = tempScore;
                this.nextTurn();
            } else if(this.currentPlayer === tempPlayer && tempScoreType === 11 && tempScore === 100) {
                e.path[0].textContent = tempScore;
                this.turn = 0;
                this.players[this.currentPlayer].completedChoices[tempScoreType] = tempScore;
                this.players[this.currentPlayer].score += tempScore;
                this.nextTurn();
            }
            else {
                return;
            }
        };
    }

    render() {
        this.dom = scoreAppTemplate.content;
        this.scoreSection = this.dom.getElementById('score-section');
        this.diceSection = this.dom.getElementById('dice-section');

        this.DiceApp = new DiceApp();
        this.diceSection.appendChild(this.DiceApp.render());
        this.currentRoll = this.DiceApp.GameDice;

        this.ScoringSystem = new ScoringSystem();
        this.renderPlayers();
        this.ScoreCard = new ScoreCard(this.tdListener, this.players);
        this.scoreSection.appendChild(this.ScoreCard.render());

        this.startRound();

        this.dom.appendChild(this.diceSection);
        this.dom.appendChild(this.scoreSection);
        return this.dom;
    }

    renderPlayers() {
        for(let i = 0; i < this.playerNames.length; i++) {
            this.players.push(new Player(this.playerNames[i], this.currentRoll));
        }
    }

    startRound() {
        this.ScoreCard.playerGlow(this.currentPlayer + 1);
        this.DiceApp.reset();
        this.DiceApp.update();
    }

    nextTurn() {
        this.rollButton.disabled = false;

        this.ScoreCard.playerUnglow(this.currentPlayer + 1);
        if(!this.players[this.currentPlayer].topBonus) {
            this.ScoreCard.updateTopTotals(this.players, this.currentPlayer);
        }

        this.currentPlayer++;
        if(this.currentPlayer >= this.players.length) {
            this.currentPlayer = 0;
        }
        this.ScoreCard.updateTotals();
        this.startRound();
    }
}
