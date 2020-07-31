import inquirer from 'inquirer';
import chalk from 'chalk';
import program, { option } from 'commander';
import { Writer } from './writer';

export interface IOption {
  fileName: string;
  outputFileName: string;
  codeunitID: number;
  codeunitName: string;
}

export class CLI {
  static async start() {
    program
      .version('0.0.1')
      .description(
        chalk.green(
          'Creates a codeunit for demo data with the file embedded.\n'
        )
      )
      .option(
        '-f, --file <filename>',
        'Specify the file to embed into codeunit.'
      )
      .option('-i, --codeunit-id <number>', 'Specify the codeunit id.')
      .option('-n, --codeunit-name <string>', 'Specify the codeunit name.')
      .option(
        '-o, --output-file <filename>',
        'Specify the AL codeunit output file.'
      )
      .parse(process.argv);

    console.log(
      chalk.green(
        'AL Embed File Tool by MSN Raju, All e Technologies Pvt. Ltd.\n'
      )
    );

    const options: IOption = {
      fileName: program['file'],
      codeunitID: program['codeunit-id'],
      codeunitName: program['codeunit-name'],
      outputFileName: program['output-file'],
    };

    await this.promptForMissingOptions(options);
    Writer.generateCodeunit(options);
  }

  private static async promptForMissingOptions(options: IOption) {
    const questions = [];
    
    inquirer.registerPrompt('filePath', require('inquirer-file-path'));

    if (!options.fileName) {
      questions.push({
        type: 'file',
        name: 'fileName',
        message: 'Path of the file to embed: ',
        basePath: './',
        validate: (input: string) => {
          return input ? true : false;
        },
      });
    }

    if (!options.codeunitID) {
      questions.push({
        type: 'number',
        name: 'codeunitID',
        message: 'Codeunit ID: ',
        validate: (input: number) => {
          return input ? true : false;
        },
      });
    }

    if (!options.codeunitName) {
      questions.push({
        type: 'input',
        name: 'codeunitName',
        message: 'Codeunit Name: ',
        validate: (input: string) => {
          return input ? true : false;
        },
      });
    }

    if (!options.outputFileName) {
      questions.push({
        type: 'file',
        name: 'outputFileName',
        message: 'Output Codeunit File Name: ',
        validate: (input: string) => {
          return input ? true : false;
        },
      });
    }

    const answers = await inquirer.prompt(questions);
    options.fileName = options.fileName || (answers.fileName as string);
    options.codeunitID = options.codeunitID || (answers.codeunitID as number);
    options.codeunitName =
      options.codeunitName || (answers.codeunitName as string);
    options.outputFileName =
      options.outputFileName || (answers.outputFileName as string);
  }
}
