const { writeFileSync, readFileSync } = require("fs");
const { execSync } = require("child_process");
const { platform } = require("os");

console.log("Installing the agent...");
const npm = platform() === "win32" ? "npm.cmd" : "npm";
execSync(`${npm} install --save-dev '@appland/appmap-agent-js'`, {
  stdio: "inherit",
});

console.log("Adding configuration file...");
writeFileSync("appmap.yml", "packages:\n  - glob: src/*\n", "utf8");

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
