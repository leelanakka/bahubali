const shelljs = require("shelljs");

const reader = require("fs").readFileSync;

let userNames = reader("./userNames.txt", "utf8").split("\n");
userNames.pop();

shelljs.cd("./interns");

userNames.map(y => {
  x = "./wc-" + y;
  shelljs.cd(x);
  shelljs.exec("mocha  --recursive --reporter mocha_reporter 1>/dev/null");
  let data1 = reader("./__report.json", "utf8");
  data1 = JSON.parse(data1);
  shelljs.exec("git log --oneline | wc -l > commits.txt");
  let commits = reader("commits.txt", "utf8").split("\n")[0];
  console.log(y + "\nnumberOfCommits" + commits);
  shelljs.rm("./commits.txt");
  console.log(
    "totalTests:" + data1.total + "\npassedTests:" + data1.passed.length + "\n"
  );
  shelljs.cp("../../test/file", "file");
  let command = "mocha  --recursive --reporter mocha_reporter ../../test";
  shelljs.exec(command);
  let mochaTest = "nyc -r json-summary mocha --recursive > /dev/null";
  shelljs.exec(mochaTest );
  let coverage = reader("coverage/coverage-summary.json", "utf8");
  coverage = JSON.parse(coverage);
  console.log("total tests coverage"+coverage.total.lines.pct);
  let data2 = reader("./__report.json", "utf8");
  data2 = JSON.parse(data2);
  console.log(
    "mytotalTests:" +
      data2.total +
      "\nmypassedTests:" +
      data2.passed.length +
      "\n"
  );
  shelljs.cd("../");
});
shelljs.cd("../");
