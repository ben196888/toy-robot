const sinon = require('sinon');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { requireUncached } = require('./helpers');

const INPUT_FILE_NAME = 'input.txt';
const OUTPUT_FILE_NAME = 'output.txt';
const STDIN = 'stdin';
const STDOUT = 'stdout';

describe('io', function() {
  const sandbox = sinon.createSandbox();
  let io;
  beforeEach(function() {
    sandbox.stub(readline, 'createInterface').returns({});
    sandbox.stub(path, 'join').returns('/some/path');
    io = requireUncached('../src/io');
  });
  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
  });
  describe('init', function() {
    it('should not called createReadStream when input is stdin', function() {
      const createReadStreamSpy = sandbox.spy(fs, 'createReadStream');
      io.init(STDIN, STDOUT);
      sinon.assert.notCalled(createReadStreamSpy);
    });
    it('should call createReadStream once when input is not stdin', function() {
      const createReadStreamStub = sandbox.stub(fs, 'createReadStream').returns(INPUT_FILE_NAME);
      io.init(INPUT_FILE_NAME, STDOUT);
      sinon.assert.calledOnce(createReadStreamStub);
    });
    it('should not called createWriteStream when output is stdout', function() {
      const createWriteStreamSpy = sandbox.spy(fs, 'createWriteStream');
      io.init(STDIN, STDOUT);
      sinon.assert.notCalled(createWriteStreamSpy);
    });
    it('should call createWriteStream once when output is not stdout', function() {
      const createWriteStreamStub = sandbox.stub(fs, 'createWriteStream').returns(OUTPUT_FILE_NAME);
      io.init(STDIN, OUTPUT_FILE_NAME);
      sinon.assert.calledOnce(createWriteStreamStub);
    });
  });
});
