const fs = require('fs');
const path = require('path');
const chance = require('chance').Chance();

const csvFilePath = path.join(__dirname, 'gnomes.csv');
const numRows = 2888;
const data = [];

for (let i = 0; i < numRows; i++) {
const name = chance.first({ gender: "male" });
const desc = chance.sentence();
const attack = chance.integer({ min: 0, max: 10 });
const defense = chance.integer({ min: 0, max: 10 });
const intellect = chance.integer({ min: 0, max: 10 });
const special = chance.integer({ min: 0, max: 10 });
const goggles = false;
const hair = false;
const weapon = false;
const pet = false;
const state = false;
const drawstyle = false;
const type = false;

const hp = Math.round((attack + defense + intellect + special) / 4);

data.push([i + 1, name, hp, attack, defense, intellect, special, goggles, hair, weapon, pet, state, drawstyle, type, desc ]);
}

const csvData = data.map(row => row.join(',')).join('\n');

fs.writeFile(csvFilePath, csvData, (err) => {
if (err) {
console.error(err);
} else {
    console.log(`Wrote ${numRows} rows to ${csvFilePath}`);
  }
});
