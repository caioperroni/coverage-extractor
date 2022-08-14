"use strict";

// ♻ Handle arguments
if (!process.argv[2]) {
  throw new Error("Missing input coverage JSON file path");
}
const outpath = process.argv[3] ? `./${process.argv[3]}` : "./output";

// ♻ Try/catch JSON file load
let coverageJSON;
try {
  coverageJSON = require(process.argv[2]);
} catch (error) {
  throw new Error("Not able to load JSON file: " + process.argv[2]);
}

// ♻ Require fs dependencies
const { mkdirSync, existsSync, writeFileSync } = require("fs");

// ♻ Handle output folder creation
if (!existsSync(outpath)) mkdirSync(outpath, { recursive: true });
if (!existsSync(outpath + "/css")) mkdirSync(outpath + "/css");
if (!existsSync(outpath + "/js")) mkdirSync(outpath + "/js");
if (!existsSync(outpath + "/mixed")) mkdirSync(outpath + "/mixed");

// ♻ Map coverage JSON files items
coverageJSON.map((item) => {
  // ♻ Escape empty files, assure item.text.substring call on line 49
  if (!!item.text) {
    let fileName, writePath;
    let text = "";
    let breakLine = "\n";

    // ♻ Handle fileName considering URL. Root HTML document, if not named on URL, will be root.mixed on mixed folder
    fileName = item.url.split("/");
    fileName = fileName[fileName.length - 1].split("?")[0];
    if (!fileName || fileName === "") fileName = "root";

    // ♻ Set writePath to "mixed" content as default. Mainly for <script> and <style> tags defined on HTML files
    writePath = outpath + "/mixed/" + fileName + ".mixed";

    // ♻ Check if it's a CSS file with regex test and change writePath to CSS folder
    if (/(.*?)\.css$/.test(fileName)) writePath = outpath + "/css/" + fileName;

    // ♻ Check if it's a JS file with regex test, change writePath to JS folder and remove breakLine as they can mess even more minified files
    if (/(.*?)\.js$/.test(fileName)) {
      writePath = outpath + "/js/" + fileName;
      breakLine = "";
    }

    // ♻ Map ranges and concatenate used code parts from the text content
    item.ranges.map((range) => {
      text += item.text.substring(range.start, range.end);
      text += breakLine;
    });

    // ♻ Write concatenated used parts of code to output file
    if (text.length > 0) writeFileSync(writePath, text);
  }
});
