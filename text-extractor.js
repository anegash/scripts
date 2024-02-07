const fs = require('fs');
const readline = require('readline');

// Replace this with your file path
const filePath = '';

const uniqueMatches = new Set();
const pattern = /ispmdev\.db_ispm\.(\w+)/;

const readInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
    output: process.stdout,
    console: false
});

readInterface.on('line', function(line) {
    const matches = line.match(pattern);
    if (matches && matches[1]) {
        const match = matches[1];
        if (!uniqueMatches.has(match)) {
            console.log(match);
            uniqueMatches.add(match);
        }
    }
});

readInterface.on('close', function() {
    // Optionally, do something after reading the file is completed.
    console.log('File reading completed.');
});
