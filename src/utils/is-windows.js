const isWindows = () => !!/^win/.test(process.platform)

module.exports = isWindows
