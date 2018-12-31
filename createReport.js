const fs = require("fs");
const Table = require("cli-table");
let data = fs.readFileSync("./report.json", "utf8");
const sorting = function(a, b) {
  if (a.TestsPassed < b.TestsPassed) {
    return -1;
  }
  if (a.TestsPassed > b.TestsPassed) {
    return 1;
  }
  return 0;
};
data = JSON.parse(data);
data = data.sort(sorting);

userArgs = process.argv.slice(2);

const filterErrors = function(data){
    return data.filter((user) => {
        let coveragePassed = (user.coverage < 100)
        let MochaTests = (user.MochaTestsPassed < user.MochaTestsTotal);
        let BahubaliTests = (user.TestsPassed < user.TotalTests);
        let result = coveragePassed || MochaTests || BahubaliTests;
        return result;
    })
}

const exactPersons = function(userArgs,data){
    return data.filter((user) => {
        return userArgs.includes(user.userName);
    })
}

const parser = function(userArgs,data){
    if(userArgs.length == 0){
        return data;
    }
    if(userArgs[0] === "error"){
        return filterErrors(data);
    }
    return exactPersons(userArgs,data)
}

data = parser(process.argv.slice(2),data)
const head = [
  "UserName",
  "ShaId",
  "NoOfCommits",
  "MochaTests",
  "Coverage",
  "BahubaliTests"
];
const table = new Table({ head });

data.map(user => {
  let MochaTests = user.MochaTestsPassed + " / " + user.MochaTestsTotal;
  let BahubaliTests = user.TestsPassed + " / " + user.TotalTests;
  table.push([
    user.userName,
    user.shaID,
    user.noOfCommits,
    MochaTests,
    user.coverage,
    BahubaliTests
  ]);
});

console.log(table.toString());
