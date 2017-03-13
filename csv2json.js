const fs = require('fs');

const csvFileName = process.argv[2];
const jsonFileName = process.argv[3];
const csv = readCsv(csvFileName);
const rows = csv.split("\n");
const outputFileName = jsonFileName;
const reg = /,(.+)/;
let rootObject = {};

function readCsv(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}


for (row of rows) {
  let columns = row.split(reg);
  assign(rootObject, columns[0].split('.'), columns[1]);
}
fs.writeFile(outputFileName, JSON.stringify(rootObject), err => {
  console.error(err);
})

function assign(obj, keyPath, value) {
  for (let i = 0; i < keyPath.length - 1; ++i) {
    key = keyPath[i];
    if (!(key in obj)) {
      if (Number.isInteger(parseInt(key))) {
        key = parseInt(key);
      }
      if (Number.isInteger(parseInt(keyPath[i + 1]))) {
        obj[key] = [];
      } else {
        obj[key] = {};
      }
    }
    obj = obj[key];
  }
  obj[keyPath[keyPath.length - 1]] = value;
}

