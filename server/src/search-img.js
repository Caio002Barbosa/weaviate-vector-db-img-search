import { writeFileSync, readFileSync } from "fs";
import * as path from "path";
import { client } from "./weaviate.js";

const searchImg = async (imgName = "test1.jpg") => {
  const pathFile = path.join(
    path.resolve(),
    `/src/search-imgs-sample/${imgName}`
  );
  console.log("pathFile", pathFile);
  const test = Buffer.from(readFileSync(pathFile)).toString("base64");

  const resImage = await client.graphql
    .get()
    .withClassName("Meme")
    .withFields(["image", "text"])
    .withNearImage({ image: test })
    .withLimit(1)
    .do();

  const result = resImage.data.Get.Meme[0].image;
  const now = new Date();
  const pathResultFile = path.join(
    path.resolve(),
    `/src/result-imgs/result-${now.toISOString()}.jpeg`
  );
  writeFileSync(pathResultFile, result, "base64");

  console.log("[FINISH]");
};

export { searchImg };
