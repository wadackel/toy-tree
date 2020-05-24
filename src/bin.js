#!/usr/bin/env node
const { main } = require('./');

const code = main(process.argv.slice(2), console.log, console.error);

process.exit(code);
