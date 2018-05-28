/* globals ScoreCard Player DiceApp ScoringSystem */
/* exported GameApp */

const scoreAppTemplate = document.getElementById('app-template');

class GameApp {
    constructor() {
        this.playerNames = JSON.parse(localStorage.getItem('players'));
        this.players = ['Placeholder'];
        this.turn = 0;
        this.currentPlayer = 1;
        this.gameIsFinished = false;

        // Handles user 'rolls'
        this.rollButton = document.getElementById('roll');
        this.rollButton.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.gameIsFinished) {
                window.location.replace('index.html');
            }
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
            let tempPlayer = parseInt(e.path[0].id.split('-')[1]);
            let tempScoreType = parseInt(e.path[0].id.split('-')[3]);
            let playerNow = this.players[this.currentPlayer];

            if(tempScoreType === 6) {
                return;
            }

            let tempScore = parseInt(this.ScoringSystem.checkScore(tempScoreType, playerNow.potzee, this.currentRoll));
            if(tempPlayer !== this.currentPlayer || tempScore === -1) {
                console.log('Invalid choice');
                return;
            }

            console.log('plllayerNow', playerNow);
            // Has it been chosen already?
            if(playerNow.completedChoices[tempScoreType] === -1) {
                if(tempScore === 50) {
                    playerNow.potzee = true;
                    this.ScoreCard.updatePotzee(this.currentPlayer);
                }
                this.turn = 0;
                playerNow.completedChoices[tempScoreType] = tempScore;
                playerNow.score += tempScore;
                e.path[0].textContent = tempScore;
                this.nextTurn();

            // Is it another Potzee?
            } else if(this.currentPlayer === tempPlayer && tempScoreType === 12 && tempScore === 100) {
                this.turn = 0;
                this.ScoreCard.updateDoublePotzee(this.currentPlayer);
                playerNow.completedChoices[tempScoreType] += tempScore;
                playerNow.score += tempScore;
                e.path[0].textContent = playerNow.completedChoices[tempScoreType];
                this.nextTurn();
            }
            // Go home, you're drunk
            else {
                console.log('Not a valid option');
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
            this.players.push(new Player(this.playerNames[i]));
        }
    }

    startRound() {
        this.ScoreCard.playerGlow(this.currentPlayer);
        this.DiceApp.reset();
        this.DiceApp.update();
    }

    nextTurn() {
        this.ScoreCard.playerUnglow(this.currentPlayer);
        this.ScoreCard.updateTotals();
        this.ScoreCard.updateTopTotals(this.currentPlayer);
        this.players[this.currentPlayer].finished = this.ScoreCard.checkPlayerFinished(this.currentPlayer);

        if(this.players.filter(a => !a.finished).length === 1) {
            this.endGame();
            return;
        }

        this.currentPlayer++;
        if(this.currentPlayer >= this.players.length) {
            this.currentPlayer = 1;
        }

        this.rollButton.disabled = false;
        if(!this.players[this.currentPlayer].finished) {
            this.startRound();
        }
        else {
            this.nextTurn();
        }
        return;
    }

    endGame() {
        this.rollButton.value = 'Play again?';
        this.gameIsFinished = true;
        let tempScore = 0;
        let winner = 0;
        for(let i = 1; i < this.players.length; i++) {
            if(this.players[i].score > tempScore) {
                winner = i;
            }
            tempScore = this.players[i].score;
        }
        this.ScoreCard.winnerGlow(winner);
        console.log('enders game');
    }
}
