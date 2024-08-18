const http = require('http');

// Create the HTTP server
const server = http.createServer((req, res) => {
  // Set the response header to JSON
  res.setHeader('Content-Type', 'application/json');

  // Extract request details
  const { method, url, headers } = req;
  let body = [];

  // Handle incoming data for POST requests
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  req.on('end', () => {
    // If there's a body, concatenate and parse it
    body = Buffer.concat(body).toString();

    // Create the response object with request details
    const response = {
      method,
      url,
      headers,
      body: body ? JSON.parse(body) : {}, // Parse body as JSON if not empty
    };

    // Send the response with status 200 (OK)
    res.writeHead(200);
    res.end(JSON.stringify(response, null, 2));
  });

  // Handle error in case of JSON parsing issues
  req.on('error', (err) => {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Invalid JSON' }));
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

module.exports = { server };
