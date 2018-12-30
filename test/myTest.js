const shelljs = require("shelljs");

const assert = require("assert");

const filtering = function(content) {
  return content
    .split(/ +|\t|\n/)
    .filter(x => x != "")
    .join(" ");
};

describe("wc", function() {
  it("should return return no of lines along with file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -l file");
    let actual = filtering(actualOut.stdout);
    let expected = "1 file";
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -c file");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file";
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -c file1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file1";
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -c -c -c -c -c file1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 file1";
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -ccw file1");
    let actual = filtering(actualOut.stdout);
    let expected = "1 4 file1";
    assert.deepEqual(actual, expected);
  });
  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js foo");
    let actual = filtering(actualOut.stdout);
    let expected = "0 2 13 foo";
    assert.deepEqual(actual, expected);
  });
  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js foo1");
    let actual = filtering(actualOut.stdout);
    let expected = "4 2 14 foo1";
    assert.deepEqual(actual, expected);
  });
  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js foo2");
    let actual = filtering(actualOut.stdout);
    let expected = "2 3 16 foo2";
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js wc.js");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc wc.js");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });

  it("should return no of characters along with the file name", function() {
    let actualOut = shelljs.exec("node ./wc.js -ccclccwwlc wc.js");
    let actual = filtering(actualOut.stdout);
    let expectedOut = shelljs.exec("wc -ccclccwwlc wc.js");
    let expected = filtering(expectedOut);
    assert.deepEqual(actual, expected);
  });
});
