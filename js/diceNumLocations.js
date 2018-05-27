/* exported diceImgLocations diceImgLocationsHold */
const diceNum = 6;

const diceNumLocations = [];
for(let i = 1; i <= diceNum; i++) {
    diceNumLocations.push('images/' + i + '.png');
}

const diceNumLocationsHold = [];
for(let i = 1; i <= diceNum; i++) {
    diceNumLocationsHold.push('images/' + i + '-hold.png');
}