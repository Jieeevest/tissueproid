import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

const port = 3003;
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}/`);
  console.log(`Also try http://127.0.0.1:${port}/`);
});