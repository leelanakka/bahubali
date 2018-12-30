const shelljs = require("shelljs");

const reader = require("fs").readFileSync;

const Table = require('cli-table');

const ProgressBar = require('progress');

let userNames = reader("./userNames.txt", "utf8").split("\n");
userNames = userNames.filter((x) => x !== "").sort();
const bar = new ProgressBar('running Tests[:bar] :percent', { complete: '#' ,total: userNames.length+1 });
shelljs.cd("./interns");

let table = new Table({
  head: ['UserName','Commits','Total Tests', 'Passing Tests', 'Coverage','My Total Tests','Passing']
});

bar.tick();
userNames.map(y => {
  x = "./wc-" + y;
  shelljs.cd(x);
  shelljs.exec("mocha  --recursive --reporter mocha_reporter 1>/dev/null 2>/dev/null");
  let data1 = reader("./__report.json", "utf8");
  data1 = JSON.parse(data1);
  shelljs.exec("git log --oneline | wc -l > commits.txt");
  let commits = reader("commits.txt", "utf8").split("\n")[0];
  shelljs.rm("./commits.txt");
  shelljs.cp("../../test/testFiles/*", "./");
  let command = "mocha  --recursive --reporter mocha_reporter ../../test";
  shelljs.exec(command+" 1> /dev/null 2>/dev/null");
  let mochaTest = "nyc -r json-summary mocha --recursive 1> /dev/null 2>/dev/null";
  shelljs.exec(mochaTest);
  let coverage = reader("coverage/coverage-summary.json", "utf8");
  coverage = JSON.parse(coverage);
  let data2 = reader("./__report.json", "utf8");
  data2 = JSON.parse(data2);
  shelljs.cd("../");
  table.push([y,commits,data1.total,data1.passed.length,coverage.total.lines.pct,data2.total,data2.passed.length]);
  bar.tick();
});
shelljs.cd("../");

console.log(table.toString());
