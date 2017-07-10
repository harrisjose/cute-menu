const isWindows = require('./is-windows')

function clear () {
  // Workaround for Windows with Node version 6
  // Based on: https://gist.github.com/KenanSulayman/4990953

  const isNode6 = Number(process.version.slice(1, 2)) >= 6
  const applyWorkaround = isWindows && isNode6

  if (applyWorkaround) {
    process.stdout.write('\x1B[2J\x1B[0f')
  } else {
    process.stdout.write('\x1Bc')
  }
}

module.exports = clear
