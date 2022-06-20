#!/usr/bin/env node

// Create fs object and use module to get lstat
const fs = require('fs');
const { lstat } = fs.promises;
const chalk = require('chalk');
const path = require('path');

const targetDir = process.argv[2] || process.cwd();

// Use fs object to get file or folder
fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err); 
    }

    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    })

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(filenames[index]);
        } else {
            console.log(chalk.bold(filenames[index]));
        }
    }
});