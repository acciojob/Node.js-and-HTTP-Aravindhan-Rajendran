const http = require('http');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { method, url, headers } = req;
  let body = [];

  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    body = Buffer.concat(body).toString();

    let parsedBody = {};
    if (headers['content-type'] === 'application/x-www-form-urlencoded') {
      // Parse URL-encoded data
      parsedBody = querystring.parse(body);
    } else if (headers['content-type'] === 'application/json') {
      // Parse JSON data
      try {
        parsedBody = JSON.parse(body);
      } catch (error) {
        // Handle JSON parsing errors
        res.writeHead(400);
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    }

    const response = {
      method,
      url,
      headers,
      body: parsedBody,
    };

    res.writeHead(200);
    res.end(JSON.stringify(response, null, 2));
  });

  req.on('error', (err) => {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Request error' }));
  });
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

module.exports = { server };
