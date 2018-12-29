const shelljs = require('shelljs');

const assert = require('assert');

const filtering = function(content){
    return content.split(/ +|\t|\n/).filter((x) => x != "").join(" ");
}
describe('wc', function() {
  it('should return return no of lines', function() {
    let actualOut = shelljs.exec('node ./wc.js -l file');
    let actual = filtering(actualOut.stderr + actualOut.stdout);
    let expected = "1 file"
    assert.deepEqual(actual,expected);
  });
  it('should return no of characters',function(){
    let actualOut = shelljs.exec('node ./wc.js -c file');
    let actual = filtering(actualOut.stderr + actualOut.stdout);
    let expected = '4 file';

    assert.deepEqual(actual,expected);
  })
});