// Work with file system
const fs = require('fs');

const files = fs.readdirSync('./')
console.log(files);

fs.readdir('./', (error, files) => {
    if (error) {
        console.log('Error', error);
    } else {
        console.log(files);
    }
})