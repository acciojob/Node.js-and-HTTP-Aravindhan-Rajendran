const http = require("http");
const url = require("url");
const querystring = require("querystring");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const parsedBody = querystring.parse(body);

    const responseObj = {
      method,
      path,
      query,
      body: parsedBody,
    };

    if (method !== "POST") {
      delete responseObj.body;
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(responseObj));
  });
});

/* we just simply export the server object, we donot start the server itself. isme just simplify krre hai */

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { server };
