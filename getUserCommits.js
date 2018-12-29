const shelljs = require("shelljs");

const fs = require("fs");
const userNames = fs.readFileSync("./userNames.txt", "utf8").split("\n");
userNames.pop();
let a = shelljs.ls().stdout.split('\n');
if(!a.includes('interns')){
  shelljs.mkdir('interns');
}
shelljs.cd("./interns");
repos = shelljs.ls().stdout.split("\n");
repos.pop();
userNames.map(x => {
  x = "wc-" + x;
  if (!repos.includes(x)) {
    x = "git clone https://github.com/STEP-tw/" + x + ".git";
    shelljs.exec(x);
    return;
  }
  shelljs.cd(x);
  console.log(x)
  shelljs.exec("git pull");
  shelljs.cd("../");
});
shelljs.cd("../");
