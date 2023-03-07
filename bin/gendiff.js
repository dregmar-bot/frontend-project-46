#!/usr/bin/env node
import { program } from 'commander';
import findDiff from "../src/index.js";

const command = (filepath1, filepath2) => console.log(findDiff(filepath1, filepath2));

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action(command)


program.parse()


