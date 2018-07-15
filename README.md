Toy Robot Simulator
===================

A robot simulator.

## Dependencies
- node v10.5.0
- nvm

## Before you start

Please execute following command before you start the simulator
```shell
nvm use
```

## Installation

You have to install the dependencies through `npm`.
```shell
npm install
```

## Linting

```shell
npm run lint
```

## Unit tests

```shell
npm test
```

## How to start

This program allows standard and file input/output.
It's really easy to execute the program in terminal.

The command is as following, and input/output can be `stdin`/`stdout` or a filename.

```shell
node src/index.js input output
```

or you can simply run:
```shell
npm start
```

Here are some other examples:

Read data from standard input then output to terminal
```shell
node src/index.js stdin stdout
```

Read data from a file then output to terminal
``` shell
node src/index.js input1.txt stdout
```

Read data from a file then output to a file
```
node src/index.js input.txt output.txt
```

## Real tests

There are three test files, `test1.txt`, `test2.txt`, and `test3.txt` you can test with. Following shell command would get the robot commands from the test and post the result in terminal.

```shell
node src/index.js test1.txt stdout
```

## Development mode

You can easily enable the debug message throgh assigning the environment variable `ENV` as `development`.

```shell
env ENV=development node src/index.js stdin stdout
```
