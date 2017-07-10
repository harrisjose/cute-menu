'use strict'

const chalk = require('chalk')
const keypress = require('keypress')
const clear = require('./utils/clear')
const log = require('./utils/log')
const assert = require('assert')

const defaultConfig = {
  colors: {
    inactive: chalk.white,
    active: chalk.bold.hex('#2196F3'),
    label: chalk.hex('#9E9E9E')
  },
  header: 'Available Commands:',
  glyph: '•',
  showLabels: true
}

let Menu = function Menu (options, config) {
  assert.ok(options, 'You must pass in an array of options when creating a menu instance.')
  this.options = options
  this.config = Object.assign({}, defaultConfig, config)
  this.activeIndex = 0
}

Menu.prototype.init = function () {
  keypress(process.stdin)
  let { min, max } = Math

  let handleKeyPress = (ch, key) => {
    let isEscape = (key && key.ctrl && key.name === 'c') || key.name === 'escape'

    if (isEscape) {
      process.stdin.pause()
      this.clear()
    }

    if (key.name === 'up') {
      this.activeIndex = max(0, this.activeIndex - 1)
      this.render()
      return
    }

    if (key.name === 'down') {
      this.activeIndex = min(this.options.length - 1, this.activeIndex + 1)
      this.render()
      return
    }

    if (key.name === 'return') {
      process.stdin.pause()
      process.stdin.removeListener('keypress', handleKeyPress)
      process.stdin.setRawMode(false)
      process.stdin.resume()
      this.run()
    }
  }

  process.stdin.addListener('keypress', handleKeyPress)
  process.stdin.setRawMode(true)
  process.stdin.resume()
  return this
}

Menu.prototype.render = function () {
  this.clear()

  let { header } = this.config

  let list = this.options
    .map((option, index) => {
      let isSelected = this.activeIndex === index
      return this.renderOption(option, isSelected)
    })
    .join('\n    ')

  log(`
    ${chalk.bold.grey(header)}

    ${list}
    `)
  return this
}

Menu.prototype.renderOption = function (option, isSelected) {
  let { name, label } = option

  let { active, inactive, label: alt } = this.config.colors
  let { glyph, showLabels } = this.config

  let labelFormatted = showLabels ? `: ${label}` : ''

  if (isSelected) {
    return active(`${glyph} ${name}${labelFormatted}`)
  } else {
    return inactive(`  ${name}`) + alt(labelFormatted)
  }
}

Menu.prototype.run = function () {
  let activeIndex = this.activeIndex
  let selectedOption = this.options[activeIndex]

  this.clear()
  selectedOption.action()
}

Menu.prototype.show = function () {
  this
    .clear()
    .render()
    .init()
}

Menu.prototype.clear = function () {
  clear()
  return this
}

module.exports = Menu
