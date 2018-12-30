const shelljs = require("shelljs");

const assert = require("assert");

const filtering = function(content) {
  return content
    .split(/ +|\t|\n/)
    .filter(x => x != "")
    .join(" ");
};

describe("wc", function() {
  it("should return return number of lines along with file name for -l option", function() {
    let actualOut = shelljs.exec("node ./wc.js -l file");
    let actual = filtering(actualOut.stdout);
    let expected = "1 file";
    assert.deepEqual(actual, expected);
  });

  it("should return byte count  along with the file name for -c option", function() {
    let actualOut = shelljs.exec("node ./wc.js -c file");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file";
    assert.deepEqual(actual, expected);
  });

  it("should return byte count  along with the file name for the file that dont have new line at end", function() {
    let actualOut = shelljs.exec("node ./wc.js -c file1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file1";
    assert.deepEqual(actual, expected);
  });

  it("should return byte count along with the file name for multiple -c options", function() {
    let actualOut = shelljs.exec("node ./wc.js -c -c -c -c -c file1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file1";
    assert.deepEqual(actual, expected);
  });

  it("should return byte and word count for -cw option", function() {
    let actualOut = shelljs.exec("node ./wc.js -ccw file1");
    let actual = filtering(actualOut.stdout);
    let expected = "1 4 file1";
    assert.deepEqual(actual, expected);
  });
  it("should return line count as 0 and byte and word count should return for single line file", function() {
    let actualOut = shelljs.exec("node ./wc.js foo");
    let actual = filtering(actualOut.stdout);
    let expected = "0 2 13 foo";
    assert.deepEqual(actual, expected);
  });
  it("should return all types of counts for file containing empty lines in middle if file", function() {
    let actualOut = shelljs.exec("node ./wc.js foo1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 2 14 foo1";
    assert.deepEqual(actual, expected);
  });
  it("should return all counts for multi line file and now new line at end", function() {
    let actualOut = shelljs.exec("node ./wc.js foo2");
    let actual = filtering(actualOut.stdout);
    let expected = "2 3 16 foo2";
    assert.deepEqual(actual, expected);
  });

  it("should return all counts for their own main file", function() {
    let actualOut = shelljs.exec("node ./wc.js wc.js");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc wc.js");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return all counts for nestes options like -cccclccwlc option", function() {
    let actualOut = shelljs.exec("node ./wc.js -ccclccwwlc wc.js");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -ccclccwwlc wc.js");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return word count for fileNames containig - in middle", function() {
    let actualOut = shelljs.exec("node ./wc.js -w foo-bar");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w foo-bar");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return word  for fileNames containig - in between", function() {
    let actualOut = shelljs.exec("node ./wc.js -w foo-bar-foo");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w foo-bar-foo");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return 0 as word count for file with few empty lines", function() {
    let actualOut = shelljs.exec("node ./wc.js -w empty");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w empty");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -w bahubali");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w bahubali");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return all counts as 0 for file that contains nothing", function() {
    let actualOut = shelljs.exec("node ./wc.js -w wc.js foo-bar");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w wc.js foo-bar");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return word count for multiple files", function() {
    let actualOut = shelljs.exec("node ./wc.js -w foo2 foo1");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -w foo2 foo1");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });
});
