const fs = require('fs');

// Get the file path from command line arguments
const filePath = process.argv[2];

if (!filePath) {
    console.error('Please provide a file path as an argument.');
    process.exit(1);
}

// Read the Java class file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Function to iteratively apply the replacement to handle complex conditions
    function applyReplacements(code) {
        // Regular expression to match a variable followed by .equals() containing a constant, string literal, or named constant
        // Improved to ensure correct handling of logical operators
        const regex = /(\w+)\.equals\((\".*?\"|[A-Z_0-9]+)\)/g;

        let modifiedCode = code;
        let match;
        // Perform iterative replacement to ensure each .equals condition is correctly transformed
        while ((match = regex.exec(code)) !== null) {
            const fullMatch = match[0];
            const variablePart = match[1];
            const constantPart = match[2];
            const replacement = `${constantPart}.equals(${variablePart})`;
            modifiedCode = modifiedCode.replace(fullMatch, replacement);
        }
        return modifiedCode;
    }

    const modifiedData = applyReplacements(data);

    // Output or save the modified Java class content
    console.log(modifiedData);

    // Optionally, to save the changes back to the file or to a new file:
    fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
        if (err) console.error('Error writing the modified content back to the file:', err);
        else console.log('File successfully updated.');
    });
});
