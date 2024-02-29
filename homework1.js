const http = require('http');
const routes = require('./homework1Routes');

const server = http.createServer(routes.handler);

server.listen(3000);