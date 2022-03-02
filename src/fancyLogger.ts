import chalk from 'chalk';

export const log = (args: string) => {
    console.log(
        chalk.hex('#0099ff')('[INFO]'),
        args
    );
}

export const error = (args: string) => {
    console.log(
        chalk.hex('#ff0000')('[ERROR]'),
        args
    );
}

export const warn = (args: string) => {
    console.log(
        chalk.hex('#ffee00')('[WARN]'),
        args
    );
}

export const success = (args: string) => {
    console.log(
        chalk.hex('#009900')('[SUCCESS]'),
        args
    );
}

export const debug = (args: string) => {
    console.log(
        chalk.hex('#77d13b')('[DEBUG]'),
        args
    );
}