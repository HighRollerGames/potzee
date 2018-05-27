/* exported AddPlayer */
const addPlayersTemplate = document.getElementById('add-players-template');

class AddPlayer {

    constructor(name) {
        this.name = name;
    }

    render() {
        const dom = addPlayersTemplate.content.cloneNode(true);
        const span = dom.querySelector('span');
        span.textContent = this.name;
        span.classList.add('index-player');
        dom.appendChild(span);
        return dom;
    }
}