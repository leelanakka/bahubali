const shelljs = require("shelljs");

const fs = require('fs');
const reader = fs.readFileSync;
const write = fs.writeFileSync;

const ProgressBar = require("progress");

let userNames = reader("./userNames.txt", "utf8").split("\n");
userNames = userNames.filter(x => x !== "").sort();

const bar = new ProgressBar("running Tests[:bar] :percent", {
  complete: "#",
  total: userNames.length + 1
});

let finalData = [];

bar.tick();
shelljs.cd("./interns");
userNames.map(userName => {
  let repo = "./wc-" + userName;
  shelljs.cd(repo);
  shelljs.exec(
    "mocha  --recursive --reporter mocha_reporter 1>/dev/null 2>/dev/null"
  );
  let data1 = reader("./__report.json", "utf8");
  data1 = JSON.parse(data1);
  shelljs.exec("git log --oneline > commits.txt");
  let commits = reader("commits.txt", "utf8").split("\n").length;
  let shaID = reader("commits.txt", "utf8").split(" ")[0];
  shelljs.rm("./commits.txt");
  shelljs.cp("../../test/testFiles/*", "./");
  let command = "mocha  --recursive --reporter mocha_reporter ../../test";
  shelljs.exec(command + " 1> /dev/null 2>/dev/null");
  let mochaTest =
    "nyc -r json-summary mocha --recursive 1> /dev/null 2>/dev/null";
  shelljs.exec(mochaTest);
  let coverage = reader("coverage/coverage-summary.json", "utf8");
  coverage = JSON.parse(coverage);
  let data2 = reader("./__report.json", "utf8");
  data2 = JSON.parse(data2);
  shelljs.cd("../");
  const  noOfCommits = commits
  const MochaTestsTotal = data1.total
  const MochaTestPassed = data1.passed.length
  const TotalTests = data2.total
  const TestsPassed = data2.passed.length
  coverage = coverage.total.lines.pct;
  finalData.push({
    userName,
    shaID,
    noOfCommits,
    MochaTestsTotal,
    MochaTestPassed,
    coverage,
    TotalTests,
    TestsPassed
  })
  bar.tick();
});
shelljs.cd("../");

finalData = JSON.stringify(finalData);
write('./report.json',finalData,'utf8');