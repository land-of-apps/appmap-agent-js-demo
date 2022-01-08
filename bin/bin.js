#! /usr/bin/env node
const {mainAsync} = require("../dist/index.js");
mainAsync(process.argv.slice(2));