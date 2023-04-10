import { client } from "./weaviate.js";
import { create } from "./schema.js";
import { importImgs } from "./save-imgs.js";
import { searchImg } from "./search-img.js";

// const schemaRes = await client.schema.getter().do();
// console.log(schemaRes);

// importImgs();

searchImg("test1.jpg");
