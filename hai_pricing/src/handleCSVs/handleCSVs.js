const fs = require('fs');

function parseCSV(filePath) {
    // Read the file
    const csvString = fs.readFileSync(filePath, 'utf8');

    // Split the CSV string into rows
    const rows = csvString.split('\n');

    // Extract the header row and split into column names
    const headers = rows.shift().split(',');

    // Map each row to an object
    const data = rows.map(row => {
        const values = row.split(',');
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });

    return data;
}

// Example usage
const filePath = 'path/to/your/file.csv';
const parsedData = parseCSV(filePath);
console.log(parsedData);

export default parseCSV;