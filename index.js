#!/usr/bin/env node

// Create fs object and use module to get lstat
const { all } = require('express/lib/application.js');
const fs = require('fs');
const { lstat } = fs.promises;

// Use fs object to get file or folder
fs.readdir(process.cwd(), async (err, filenames) => {
    if (err) {
        console.log(err); 
    }

    const statPromises = filenames.map(filename => {
        return lstat(filename);
    })

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        console.log(filenames[index], stats.isFile());
    }
});