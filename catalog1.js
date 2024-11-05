const fs = require("fs");

// Read JSON input from file
// const jsonInput = fs.readFileSync("input.json", "utf8");
const jsonInput = fs.readFileSync("input.json", "utf8");

function baseToDecimal(valueStr, base) {
  return parseInt(valueStr, base);
}
// const arr = [];
function computeIntercept(pointsArray) {
  let intercept = 0;

  for (let i = 0; i < pointsArray.length; i++) {
    let term = pointsArray[i].yValue;
    let denom = 1;
    // yj.xi/xi-xj
    for (let j = 0; j < pointsArray.length; j++) {
      if (j !== i) {
        term *= -pointsArray[j].xValue;
        denom *= pointsArray[i].xValue - pointsArray[j].xValue;
      }
    }
    // console.log(term);
    // console.log(denom);
    // arr.push({ x: term, y: denom });
    // console.log(term / denom);
    intercept += term / denom;
  }

  return intercept;
}

// Parse JSON input
const jsonData = JSON.parse(jsonInput);

// Extract points
const pointsArray = [];
for (const id in jsonData) {
  if (id !== "keys") {
    const base = parseInt(jsonData[id].base, 10);
    const valueStr = jsonData[id].value;
    const yValue = baseToDecimal(valueStr, base);
    const xValue = parseInt(id, 10);
    console.log(xValue, yValue);
    pointsArray.push({ xValue, yValue });
  }
}

// Calculate the constant term

const intercept = computeIntercept(pointsArray);

for (let i = 0; i < pointsArray.length; i++) {
  // console.log(intercept - pointsArray[i].xValue - pointsArray[i].yValue);
  console.log(intercept - pointsArray[i].yValue);
  for (let j = 1; j < 100; j++) {
    if (27.12890625 * j === intercept - pointsArray[i].yValue)
      console.log(27.12890625 * j);
  }
}
console.log("hello");
// for (let i = 1; i < 100; i++) {
//   if(27.12890625 * i)
//   console.log(27.12890625 * i);
// }
// Output the constant term
console.log(`Constant term (coefficient of x^0): ${intercept.toFixed(0)}`);
