const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (args) => {
    console.log(args);
});

// Raise an event
emitter.emit('messageLogged', {
    id: 1,
    url: 'http://'
});