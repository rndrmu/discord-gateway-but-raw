/**
 * This file contains various logging functions
 * To reduce overall dependencies, we use ANSI Codes to color the output
 */


export const log = (args: string) => {
    console.log(
        `\x1b[32m[LOG]\x1b[0m ${args}`
    );
}

export const error = (args: string) => {
    console.log(
        `\x1b[31m[ERROR]\x1b[0m ${args}`
    );
}

export const warn = (args: string) => {
    console.log(
        `\x1b[33m[WARN]\x1b[0m ${args}`
    );
}

export const success = (args: string) => {
    console.log(
        `\x1b[32m[SUCCESS]\x1b[0m ${args}`
    );
}

export const debug = (args: string) => {
    console.log(
        `\x1b[36m[DEBUG]\x1b[0m ${args}`
    );
}