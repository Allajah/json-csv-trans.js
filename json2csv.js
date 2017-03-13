const fs = require('fs');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

let rootObj = readJson(process.argv[2]);
const outputFileName = process.argv[3];
let output="";

function readObject(obj, label) {
  for (let o in obj) {
    if (typeof(obj[o]) == "object") {
      if (label != '') {
        readObject(obj[o], label + '.' + o);
      } else {
        readObject(obj[o], label + o);
      }
    } else {
      let key = '';
      if (label != '') {
        key = label + '.' + o;
      } else {
        key = label + o;
      }
      output += key + ',' + obj[o] + "\n";
    }
  }
}

readObject(rootObj, "");
fs.writeFile(outputFileName, output, err => {
  console.error(err);
});
