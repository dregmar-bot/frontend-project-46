#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

const options = program.opts();
const command = (filepath1, filepath2) => {
  console.log(genDiff(filepath1, filepath2, options.format));
};

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action(command);
program.parse();
