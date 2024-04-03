import { stdout } from "process";

const num = [2, 5, 5, 11];
const target = 10;
var twofunction = function (num, target) {
  let total = [];
  let index = [];
  for (let i = 0; i <= 0; i++) {
    for (let j = num.length - 1; j !== i && j >= 0; j--) {
      total = num[i] + num[j];
      if (total === target) {
        index = [i, j];
      }
    }
  }
  console.log(index);
};
