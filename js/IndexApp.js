/* global AddPlayer StartGame */
/* exported IndexApp */

const indexAppTemplate = document.getElementById('index-app-template');

class IndexApp {

    constructor() {
        this.players = [];
    }

    render() {
        this.dom = indexAppTemplate.content;
        this.addPlayerSection = this.dom.getElementById('add-players-section');
        this.startGameSection = this.dom.getElementById('start-game-section');
        this.dom.appendChild(this.startGameSection);
        this.dom.appendChild(this.addPlayerSection);
        document.getElementById('player-name').focus();
        document.getElementById('player-name').addEventListener('keyup', (e) => {
            e.preventDefault();
            if(e.keyCode === 13) {
                document.getElementById('add-player').click();
            }
        });
        document.getElementById('add-player').addEventListener('click', (e) => {
            e.preventDefault();

            let name = document.getElementById('player-name').value;

            if(name === '') {
                alert('Please enter a name');
                return;
            }

            this.players.push(name);
            let player = new AddPlayer(name);
            document.getElementById('player-name').value = '';
            document.getElementById('player-name').focus();

            if(this.players.length === 2) {
                const Start = new StartGame(this.players);
                this.startGameSection.appendChild(Start.render());
            }

            if(this.players.length === 6) {
                localStorage.setItem('players', JSON.stringify(this.players));
                document.getElementById('add-player').disabled = true;
            }

            this.addPlayerSection.appendChild(player.render());
        });
        return this.dom;
    }
}

