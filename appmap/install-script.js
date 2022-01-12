const { readFileSync, writeFileSync } = require("fs");

console.log("Adding some npm scripts...");
const npm = JSON.parse(readFileSync("package.json", "utf8"));
const { test, start } = npm.scripts;
npm.scripts = {
  ...npm.scripts,
  "appmap-test": `npx appmap-agent-js --recorder=mocha -- ${test}`,
  "appmap-start": `npx appmap-agent-js --recorder=process -- ${start}`,
  "appmap-start-partial": `npx appmap-agent-js --recorder=remote -- ${start}`,
};
writeFileSync("package.json", JSON.stringify(npm, null, 2), "utf8");
