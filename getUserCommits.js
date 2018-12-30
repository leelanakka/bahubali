const shelljs = require("shelljs");
const ProgressBar = require('progress');
const fs = require("fs");
let userNames = fs.readFileSync("./userNames.txt", "utf8").split("\n");
userNames = userNames.filter((x) => x !== "");
const bar = new ProgressBar('running Tests[:bar] :percent', { complete: '#' ,total: userNames.length+1 });
let ls = shelljs.ls().stdout.split("\n");
if (!ls.includes("interns")) {
  shelljs.exec(
    "npm install -g https://github.com/craftybones/mocha-json-reporter.git 1> /dev/null 2>/dev/null"
  );
  shelljs.mkdir("interns");
}
shelljs.cd("./interns");
bar.tick();
const repos = shelljs.ls().stdout.split("\n");
repos.pop();
userNames.map(x => {
  x = "wc-" + x;
  if (!repos.includes(x)) {
    let y = "git clone https://github.com/STEP-tw/" + x + ".git 1> /dev/null 2>/dev/null";
    shelljs.exec(y);
    shelljs.cd(x);
    shelljs.cd("../");
    return;
  }
  shelljs.cd(x);
  shelljs.exec("git pull "+ "1> /dev/null 2>/dev/null");
  shelljs.cd("../");
  bar.tick();
});

shelljs.cd("../");
