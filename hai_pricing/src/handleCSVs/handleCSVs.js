function fetchCSV(url) {
    return fetch(url)
        .then(response => response.text())
        .then(csvString => parseCSV(csvString))
        .catch(error => console.error('Error fetching CSV:', error));
}

async function parseCSV(csvString) {
    const rows = csvString.split('\n');
    const headers = rows.shift().split(',');

    const data = rows.map(row => {
        const values = row.split(',');
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index].trim();
        });
        return obj;
    });
    //console.log(data)
    return data;
}



export {parseCSV, fetchCSV};