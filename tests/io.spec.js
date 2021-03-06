const chai = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
// TODO: istanbul coverage cannot calculate coverage from requrieUncached
const { requireUncached } = require('./helpers');

const expect = chai.expect;

const INPUT_FILE_NAME = 'input.txt';
const OUTPUT_FILE_NAME = 'output.txt';
const FAKE_READ_STREAM = 'FAKE_READ_STREAM';
const FAKE_WRITE_STREAM = 'FAKE_WRITE_STREAM';
const STDIN = 'stdin';
const STDOUT = 'stdout';

describe('io', function() {
  const sandbox = sinon.createSandbox();
  let io;
  let readlineStub, onStub, setPromptStub, promptStub;
  beforeEach(function() {
    onStub = sandbox.stub();
    setPromptStub = sandbox.stub();
    promptStub = sandbox.stub();
    readlineStub = sandbox.stub(readline, 'createInterface').returns({
      on: onStub,
      setPrompt: setPromptStub,
      prompt: promptStub,
    });
    sandbox.stub(path, 'join').returns('/some/path');
    io = requireUncached('../src/io');
  });
  afterEach(function() {
    sandbox.restore();
    sandbox.reset();
  });
  describe('init', function() {
    describe('create read and write stream', function() {
      it('should not called createReadStream when input is stdin', function() {
        const createReadStreamSpy = sandbox.spy(fs, 'createReadStream');
        io.init(STDIN, STDOUT);
        sinon.assert.notCalled(createReadStreamSpy);
      });
      it('should call createReadStream once when input is not stdin', function() {
        const createReadStreamStub = sandbox.stub(fs, 'createReadStream').returns(FAKE_READ_STREAM);
        io.init(INPUT_FILE_NAME, STDOUT);
        sinon.assert.calledOnce(createReadStreamStub);
      });
      it('should not called createWriteStream when output is stdout', function() {
        const createWriteStreamSpy = sandbox.spy(fs, 'createWriteStream');
        io.init(STDIN, STDOUT);
        sinon.assert.notCalled(createWriteStreamSpy);
      });
      it('should call createWriteStream once when output is not stdout', function() {
        const createWriteStreamStub = sandbox.stub(fs, 'createWriteStream').returns(FAKE_WRITE_STREAM);
        io.init(STDIN, OUTPUT_FILE_NAME);
        sinon.assert.calledOnce(createWriteStreamStub);
      });
    });

    describe('create readline interface', function() {
      it('should create interface with empty prompt', function() {
        io.init(STDIN, STDOUT);
        sinon.assert.calledOnce(readlineStub);
        sinon.assert.calledWithMatch(readlineStub, { prompt: '' });
      });
      it('should create interface with stdin and stdout', function() {
        io.init(STDIN, STDOUT);
        sinon.assert.calledOnce(readlineStub);
        sinon.assert.calledWithMatch(readlineStub, { input: process.stdin, output: process.stdout });
      });
      it('should create interface with input stream and stdout', function() {
        sandbox.stub(fs, 'createReadStream').returns(FAKE_READ_STREAM);
        io.init(INPUT_FILE_NAME, STDOUT);
        sinon.assert.calledOnce(readlineStub);
        sinon.assert.calledWithMatch(readlineStub, { input: FAKE_READ_STREAM, output: process.stdout });
      });
      it('should create interface with stdin and output stream', function() {
        sandbox.stub(fs, 'createWriteStream').returns(FAKE_WRITE_STREAM);
        io.init(STDIN, OUTPUT_FILE_NAME);
        sinon.assert.calledOnce(readlineStub);
        sinon.assert.calledWithMatch(readlineStub, { input: process.stdin, output: FAKE_WRITE_STREAM });
      });
      it('should create interface with input stream and output stream', function() {
        sandbox.stub(fs, 'createReadStream').returns(FAKE_READ_STREAM);
        sandbox.stub(fs, 'createWriteStream').returns(FAKE_WRITE_STREAM);
        io.init(INPUT_FILE_NAME, OUTPUT_FILE_NAME);
        sinon.assert.calledOnce(readlineStub);
        sinon.assert.calledWithMatch(readlineStub, { input: FAKE_READ_STREAM, output: FAKE_WRITE_STREAM });
      });
    });
  });

  describe('validator', function() {
    it('should throw an error if not inited', function() {
      expect(io.validator).to.throw('readline is not initialised.');
    });
    it('should not throw error after inited', function() {
      io.init(STDIN, STDOUT);
      expect(io.validator).not.throw();
    });
  });

  describe('onLine', function() {
    it('should throw error if not inited', function() {
      expect(io.onLine).to.throw('readline is not initialised.');
    });
    it('should listen on-line event', function() {
      io.init(STDIN, STDOUT);
      io.onLine(() => null);
      sinon.assert.calledOnce(onStub);
      sinon.assert.calledWith(onStub, 'line');
    });
  });

  describe('println', function() {
    it('should throw error if not inited', function() {
      expect(io.println).to.throw('readline is not initialised.');
    });
    it('should setPrompt string with \\n then prompt the message.', function() {
      io.init(STDIN, STDOUT);
      io.println('test line');
      sinon.assert.calledOnce(setPromptStub);
      sinon.assert.calledWith(setPromptStub, 'test line\n');
      sinon.assert.calledOnce(promptStub);
      expect(promptStub.calledAfter(setPromptStub)).to.be.true;
    });
  });
});
