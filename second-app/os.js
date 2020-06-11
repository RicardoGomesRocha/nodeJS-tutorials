// Work with operation system
const os = require('os');
setInterval(() => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    console.log(`Total Memory: ${totalMemory}`);
    console.log(`Free Memory: ${freeMemory}`);
}, 1000);