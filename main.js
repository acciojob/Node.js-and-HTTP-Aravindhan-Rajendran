const http = require('http');

const server = http.createServer((req, res) => {
  // TODO: Implement this function
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

module.exports = { server };
