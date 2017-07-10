const Menu = require('./src/index')
const chalk = require('chalk')
const cows = require('./src/utils/cows')

let options = [
  {
    name: 'Option 1',
    label: 'This is the option to end all options',
    action: () => {
      console.log(cows.radCow)
      process.exit(0)
    }
  },
  {
    name: 'Option 2',
    label: 'This is a totally cool option even though its second',
    action: () => {
      console.log(cows.lincolnCow)
      process.exit(0)
    }
  },
  {
    name: 'Option 3',
    label: 'This option is here cause it takes 3 to tango',
    action: () => {
      console.log('No cows for you!')
      process.exit(0)
    }
  }
]

let config = {
  colors: {
    active: chalk.bold.hex('#FF7055'),
    inactive: chalk.hex('#FF9F55'),
    label: chalk.hex('#FADAA3')
  },
  header: chalk.bold.hex('#FADAA3')('COW FARM:'),
  glyph: 'λ',
  showLabels: true
}

const menu = new Menu(options, config)
menu.show()
