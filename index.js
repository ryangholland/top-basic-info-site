const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/:page?', (req, res) => {
  const page = req.params.page || 'index'; // Default to "index" for "/"
  const filePath = path.join(__dirname, 'public', `${page}.html`);

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // If file does not exist, serve the 404 page
      res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    } else {
      // Serve the requested page
      res.sendFile(filePath);
    }
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Express app - listening on port ${PORT}!`);
});

// First express solution below

// const express = require("express");
// const app = express();
// const path = require("path");

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// app.get("/about", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// app.get("/contact-me", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "contact-me.html"));
// });

// app.get("*", (req, res) => {
//   res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
// });

// const PORT = process.env.PORT || 8080;

// app.listen(PORT, () => {
//   console.log(`Express app - listening on port ${PORT}!`);
// });

//
//
//

// Code for vanilla NodeJS below

// const http = require("http");
// const path = require("path");
// const fs = require("fs");

// const server = http.createServer((req, res) => {
//   let filePath = path.join(
//     __dirname,
//     "public",
//     req.url === "/" ? "index.html" : req.url
//   );

//   let contentType = "text/html";

//   if (path.extname(filePath) == "") filePath += ".html";

//   fs.readFile(filePath, (err, content) => {
//     if (err) {
//       if ((err.code = "ENOENT")) {
//         // Page not found
//         fs.readFile(
//           path.join(__dirname, "public", "404.html"),
//           (err, content) => {
//             res.writeHead(404, { "Content-Type": contentType });
//             res.end(content, "utf8");
//           }
//         );
//       } else {
//         // Server error
//         res.writeHead(500);
//         res.end(`Server Error: ${err.code}`);
//       }
//     } else {
//       // Success
//       res.writeHead(200, { "Content-Type": contentType });
//       res.end(content, "utf8");
//     }
//   });
// });

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
