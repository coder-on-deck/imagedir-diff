#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2))
require('./index').compare(argv).then((result) => {
  console.log(JSON.stringify(result, {}, 2))
  if (result.failed.length > 0) {
    process.exit(1)
  }
})
