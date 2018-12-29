const shelljs = require('shelljs');

const reader = require('fs').readFileSync;

let userNames = reader('./userNames.txt', 'utf8').split('\n');
userNames.pop();

shelljs.cd('./interns');

userNames.map(y => {
  x = './wc-' + y;
  shelljs.cd(x);
  shelljs.exec('git log --oneline | wc -l > commits.txt');
  let commits = reader('commits.txt', 'utf8').split('\n')[0];
  console.log(y + commits);
  shelljs.rm('./commits.txt');
  shelljs.cd('../');
});
