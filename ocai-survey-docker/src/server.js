const PORT = 8080;

const fs = require("fs");
const path = require("path");
const util = require("util");

const express = require("express");
const app = express();

function sanitize(input) {
    return input.replace(/[^a-zA-Z0-9_]/gi, "-");
}

app.post("/save/:name", function (req, res) {
    if (!req.params.name || typeof(req.params.name) !== "string") {
        res.status(500).json({ "status": "name is not a valid string" });
        return;
    }

    var body = [];
    var name = sanitize(req.params.name);

    req.on("data", function (chunk) {
        body.push(chunk);
    });

    req.on("end", function () {
        console.log("[!!] Saving '%s' with '%s'.", name, body.join());

        fs.writeFile(path.join(__dirname, util.format("results/%s_%d.json", name, Date.now())), body.join(), "utf-8", function (err) {
            if (err) {
                console.log("[ee] Saving file - Error: %s", err);

                res.status(500).json({ "status": "nok" });
                return;
            }

            res.status(200).json({ "status": "ok" });
        });
    });
});

app.get("/load/:name", function (req, res) {
    if (!req.params.name || typeof(req.params.name) !== "string") {
        res.status(500).json({ "status": "name is not a valid string" });
        return;
    }

    var name = sanitize(req.params.name);

    console.log("[!!] Loading file '%s'.", name);

    fs.readFile(path.join(__dirname, util.format("results/%s.json", name)), "utf-8", function (err, content) {
        if (err) {
            console.log("[ee] Loading file - Error: %s", err);

            res.status(500).json({ "status": "nok" });
            return;
        }

        console.log("[!!] Loading file - Success!");

        res.status(200).json(JSON.parse(content));
    });
});

app.use("/", express.static(path.join(__dirname, "public")));

app.listen(PORT, function () {
  console.log("[ii] Example app listening on port %d.", PORT);
});