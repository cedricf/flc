var connect = require('connect'),
    directory = '/app';

connect()
    .use(connect.static(directory))
    .listen(80);

console.log('Listening on port 80.');