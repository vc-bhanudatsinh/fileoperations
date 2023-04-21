const fs = require("fs/promises");
// const { pipeline } = require("stream");

(async () => {
  try {
    const filehandle = await fs.open("./src/dir1/test.txt");
    const readStream = filehandle.createReadStream();
    readStream.on("data", async (chunk) => {
      console.log("chunk", chunk);
      const chunkString = chunk.toString("utf8");
      await fs.appendFile("./src/dir2/test.txt", chunkString);
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
