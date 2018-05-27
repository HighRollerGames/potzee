/* exported StartGame */
const startGameTemplate = document.getElementById('start-game-template');

class StartGame {
    constructor(players) {
        this.players = players;
        // this.section =
    }

    render() {
        const dom = startGameTemplate.content;
        const button = dom.getElementById('start-game');
        button.style.display = 'block';
        button.addEventListener('click', () => {
            localStorage.setItem('players', JSON.stringify(this.players));
            window.location.replace('game.html');
        });
        return dom;
    }
}