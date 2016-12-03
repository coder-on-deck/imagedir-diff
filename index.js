var path = require('path')
var fs = require('fs-extra')
var BlinkDiff = require('blink-diff')
var async = require('async')

/**
 *
 * @param {object} opts
 * @param {string} opts.baselines - dir to hold baseline images
 * @param {string} opts.screenshots - dir to hold screenshots
 * @param {string} opts.diffs - dir to hold diffs
 */
exports.compare = function (opts) {
  opts = Object.assign({
    'diffs': 'tests/images/diffs',
    'screenshots': 'tests/images/screenshots',
    'baselines': 'tests/images/baselines'
  }, opts)
  return new Promise((resolve, reject) => {
    fs.ensureDirSync(opts.diffs)
    var results = { passed: [], failed: [] }
    var funcs = fs.readdirSync(opts.baselines).map((filename) => {
      return compareImage(filename, results, opts)
    })

    async.parallel(funcs, function () {
      resolve(results)
    })
  })
}

function compareImage (filename, results, opts) {
  return function (callback) {
    var diff = new BlinkDiff({
      imageAPath: path.join(opts.screenshots, filename), // Use file-path
      imageBPath: path.join(opts.baselines, filename),

      thresholdType: BlinkDiff.THRESHOLD_PERCENT,
      threshold: 0.01, // 1% threshold
      composition: false,
      imageOutputPath: path.join(opts.diffs, filename)
    })

    diff.run(function (error, result) {
      if (error) {
        results.failed.path(filename)
      } else {
        if (diff.hasPassed(result.code)) {
          results.passed.push(filename)
        } else {
          results.failed.path(filename)
        }
      }
      callback()
    })
  }
}
