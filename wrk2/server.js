"use strict";

const PORT = 9002;
const http = require("http");

http.createServer(function (req, res) {
    let body = [];

    req.on("data", function (chunk) {
        body.push(chunk);
    });

    req.on("end", function () {
        console.log("[ii] Received %s with body: '%j'.", req.method, JSON.parse(body.join()));
    });

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("OK.");
    res.end();
}).listen(PORT);

console.log("[ii] Ready to receive requests on %d...", PORT);