const { writeFileSync } = require("fs");

console.log("Adding configuration file...");
writeFileSync("appmap.yml", "packages:\n  - glob: src/*\n", "utf8");
