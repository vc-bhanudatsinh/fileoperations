const fs = require("fs/promises");

(async () => {
  try {
    const srcFile = "./src/dir1/test.txt";
    const destFile = "./src/dir2/test.txt";
    const fileHandle = await fs.open(srcFile);
    const readStream = fileHandle.createReadStream();
    readStream.on("data", async (chunk) => {
      await fs.appendFile(destFile, chunk.toString("utf8"));
    });
    readStream.on("end", () => {
      fs.unlink(srcFile, (error) => {
        if (error) console.log("error", error);
      });
    });
  } catch (error) {
    console.log("error", error);
  }
})();
