const fs = require('fs');
const path = require('path');
const chance = require('chance').Chance();

const csvFilePath = path.join(__dirname, 'gnomes.csv');
const numRows = 100;
const data = [];

for (let i = 0; i < numRows; i++) {
  const name = chance.male();
  const desc = chance.sentence();
  const hp = chance.integer({ min: 40, max: 80 });
  const attack = chance.integer({ min: 40, max: 80 });
  const defense = chance.integer({ min: 40, max: 80 });
  const intellect = chance.integer({ min: 40, max: 80 });
  const special = chance.integer({ min: 40, max: 80 });

  data.push([i + 1, name, hp, attack, defense, intellect, special, desc]);
}

const csvData = data.map(row => row.join(',')).join('\n');

fs.writeFile(csvFilePath, csvData, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Wrote ${numRows} rows to ${csvFilePath}`);
  }
});
