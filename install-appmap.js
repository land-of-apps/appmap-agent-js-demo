const { writeFileSync, readFileSync } = require("fs");
const { execSync } = require("child_process");

// 1. Install the agent:
execSync("npm install --save-dev '@appmap/appmap-agent-js'", {
  stdio: "inherit",
});
// 2. Add configuration:
writeFileSync("appmap.yml", "packages:\n  - glob: src/*", "utf8");
// 3. Add some npm scripts:
{
  const npm = JSON.parse(readFileSync("package.json", "utf8"));
  const { test, start } = npm.scripts;
  npm.scripts = {
    ...npm.scripts,
    "appmap-test": `npx appmap-agent-js --recorder=mocha -- ${test}`,
    "appmap-start": `npx appmap-agent-js --recorder=process -- ${start}`,
    "appmap-start-partial": `npx appmap-agent-js --recorder=remote -- ${start}`,
  };
  writeFileSync(JSON.stringify(npm, null, 2), "utf8");
}
