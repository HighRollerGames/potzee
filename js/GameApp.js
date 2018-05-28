/* globals ScoreCard Player DiceApp ScoringSystem */
/* exported GameApp */

const scoreAppTemplate = document.getElementById('app-template');

class GameApp {
    constructor() {
        this.playerNames = JSON.parse(localStorage.getItem('players'));
        this.players = [];
        this.turn = 0;
        this.currentPlayer = 0;

        // Handles user 'rolls'
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

        });

        // Handles user score choice(s)
        this.tdListener = (e) => {
            e.preventDefault();
            let tempPlayer = parseInt(e.path[0].id.split('-')[1] - 1);
            let tempScoreType = parseInt(e.path[0].id.split('-')[3]);
            let playerNow = this.players[this.currentPlayer];
            // This is the top totals row
            if(tempScoreType === 6) {
                return;
            }
            // Has it been chosen already?
            let tempScore = parseInt(this.ScoringSystem.checkScore(tempScoreType, playerNow.potzee, playerNow.currentRoll, playerNow));
            if(this.currentPlayer === tempPlayer && playerNow.completedChoices[tempScoreType] === -1) {
                if(tempScore === 50) {
                    playerNow.potzee = true;
                }
                this.turn = 0;
                playerNow.completedChoices[tempScoreType] = tempScore;
                playerNow.score += tempScore;
                e.path[0].textContent = tempScore;
                this.nextTurn();
            // Is it another Potzee?
            } else if(this.currentPlayer === tempPlayer && tempScoreType === 12 && tempScore === 100) {
                this.turn = 0;
                playerNow.completedChoices[tempScoreType] += tempScore;
                playerNow.score += tempScore;
                e.path[0].textContent = playerNow.completedChoices[tempScoreType];
                this.nextTurn();
            }
            // Go home, you're drunk
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
        this.ScoreCard = new ScoreCard(this.tdListener, this.players, this.currentPlayer);
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
        let tempPlayer = this.currentPlayer;

        this.currentPlayer++;
        if(this.currentPlayer >= this.players.length) {
            this.currentPlayer = 0;
        }

        this.ScoreCard.playerUnglow(tempPlayer - 1);
        console.log('temp player', tempPlayer, 'current', this.currentPlayer);
        if(!this.players[this.currentPlayer].topBonus) {
            this.ScoreCard.updateTopTotals(tempPlayer);
        }
        this.ScoreCard.updateTotals();
        this.startRound();
    }
}
