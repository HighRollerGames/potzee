/* global IndexApp */

// Clear localStorage from previous game
localStorage.clear();

const root = document.getElementById('root');
const app = new IndexApp();
const dom = app.render();
root.appendChild(dom);