const express = require("express");
const multer = require("multer");
const { exec: mediainfoExec } = require("mediainfo-parser");

const upload = multer({ dest: "./uploads/" });
const app = express();
const port = 3000;

app.use(express.static("."));

app.post("/upload", upload.single("file"), (req, res) => {
	console.log("request", req.file);

	mediainfoExec(req.file.path, (err, obj) => {
        if (err) {
            res.send(`failed to parse ${err}`)
        }
        res.send(obj.media.track);
	});
});

app.listen(3000, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);
