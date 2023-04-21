const fs = require("fs");
// const { pipeline } = require("stream");

(async () => {
  try {
    const readStream = fs.createReadStream("./src/dir1/test.txt", {
      highWaterMark: 100,
    });
    readStream.on("data", (chunk) => {
      console.log("chunk", chunk);
      const chunkString = chunk.toString("utf8");
      fs.appendFile("./src/dir2/test.txt", chunkString, (error) => {
        if (error) console.log("error", error);
      });
      console.log("File Appended");
    });
    readStream.on("end", () => {
      fs.unlink("./src/dir1/test.txt", (error) => {
        if (error) console.log("error", error);
      });
      console.log("Stream Ended and src file deleted");
    });
    console.log("file wrote");
  } catch (error) {
    console.log("error", error);
  }
})();
