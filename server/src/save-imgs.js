import { readdirSync, readFileSync } from "fs";
import { client } from "./weaviate.js";

const importImgs = async () => {
  const imgFiles = readdirSync("./imgs");
  const promises = imgFiles.map(async (imgFile) => {
    try {
      console.log("imgFile", imgFile);
      const b64 = Buffer.from(readFileSync(`./imgs/${imgFile}`)).toString(
        "base64"
      );

      await client.data
        .creator()
        .withClassName("Meme")
        .withProperties({
          image: b64,
          text: imgFile.split(".")[0],
        })
        .do();
    } catch (error) {
      console.log(`[FAILED] ${imgFile} - ${error}`);
      return true;
    }
  });

  await Promise.all(promises);
  console.log("[IMPORTED]");
};

export { importImgs };
