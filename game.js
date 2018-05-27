/* global GameApp */

// Scoreboard Root Dom
const root = document.getElementById('root');
const app = new GameApp();
const dom = app.render();
root.appendChild(dom);