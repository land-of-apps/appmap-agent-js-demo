const { execSync } = require("child_process");
const { platform } = require("os");

console.log("Installing the agent...");
const exec = platform() === "win32" ? "npm.cmd" : "npm";
execSync(`${exec} install --save-dev '@appland/appmap-agent-js'`, {
  stdio: "inherit",
});
