const shelljs = require("shelljs");

const reader = require("fs").readFileSync;

let userNames = reader("./userNames.txt", "utf8").split("\n");
userNames.pop();

shelljs.cd("./interns");

userNames.map(y => {
  x = "./wc-" + y;
  shelljs.cd(x);
  shelljs.exec("mocha  --recursive --reporter mocha_reporter");
  let data = reader('./__report.json','utf8');
  data = JSON.parse(data);
  shelljs.exec("git log --oneline | wc -l > commits.txt");
  let commits = reader("commits.txt", "utf8").split("\n")[0];
  console.log(y +"\nnumberOfCommits"+ commits);
  shelljs.rm("./commits.txt");
  console.log("totalTests:"+data.total+"\npassedTests:"+data.passed.length+"\n");
  shelljs.cd("../");
});
shelljs.cd("../");
