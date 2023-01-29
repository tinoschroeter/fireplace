const YoutubeDlWrap = require("youtube-dl-wrap");
const youtubeDlWrap = new YoutubeDlWrap("/usr/bin/youtube-dl");
const fs = require("fs");

const youtubeID = "Ux8xAuQBdkk";
const folder = process.env.FOLDER || "./video/";
let downloadReady = false;
const port = process.env.PORT || 3000;
let download = "";

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(folder));

if (!fs.existsSync(`${folder}/fireplace.mp4`)) {
  console.log("Datei existiert nicht");

  const youtubeDlEventEmitter = youtubeDlWrap
    .exec([
      `https://www.youtube.com/watch?v=${youtubeID}`,
      "-f",
      "136",
      "-o",
      `${folder}/fireplace.%(ext)s`,
    ])
    .on("progress", (progress) => {
      download = progress;
      console.log(
        progress.percent,
        progress.totalSize,
        progress.currentSpeed,
        progress.eta
      );
    })
    .on("youtubeDlEvent", (eventType, eventData) =>
      console.log(eventType, eventData)
    )
    .on("error", (error) => console.error(error))
    .on("close", () => (downloadReady = true));

  console.log(youtubeDlEventEmitter.youtubeDlProcess.pid);
} else {
  downloadReady = true;
}

app.get("/healthz", (req, res) => res.send("ok"));

app.get("/", (req, res) => {
  res.render("index", {
    ready: downloadReady,
    download,
  });
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
