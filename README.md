Toy Robot Simulator
===================

A robot simulator for RAE.

## Dependencies
- nvm

## Before you start

Please execute following command before you start the simulator
```shell
nvm use
```

## How to start

This program allows standard and file input/output.
It's really easy to execute the program in terminal.

The command is as following, and input/output can be `stdin`/`stdout` or a filename.

```shell
node index.js input output
```

Here are some examples:

Read data from standard input then output to terminal
```shell
node index.js stdin stdout
```

Read data from a file then output to terminal
``` shell
node index.js input1.txt stdout
```

Read data from a file then output to a file
```
node index.js input.txt output.txt
```
