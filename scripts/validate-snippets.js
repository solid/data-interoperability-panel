const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const validator = require('turtle-validator')

SNIPPETS_PATH = 'proposals/primer/snippets'
// TODO (elf-pavlik) adjust to handle bob.example
IGNORE_HOSTS = [ 'solidshapes.example', 'bob.example' ]

var exitCode = 0

function validate (filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    validator(stream, (feedback) => {
      resolve({ feedback, filePath })
    })
  })
}

const allPaths = fs.readdirSync(SNIPPETS_PATH).filter(name => {
  return name.match('.example') && !IGNORE_HOSTS.includes(name)
}).flatMap((host) => {
  return fs.readdirSync(path.join(SNIPPETS_PATH, host)).map((file) => {
    return path.join(SNIPPETS_PATH, host, file)
  })
})

Promise.all(allPaths.map(validate)).then((results) => {
  for (const result of results) {
    console.log('validated: ', result.filePath)
    result.feedback.errors.forEach(function (error) {
      console.log('ERROR: ' + error)
    })
    result.feedback.warnings.forEach(function (warning) {
      console.log('WARNING: ' + warning)
    })
    if (result.feedback.errors.length > 0) exitCode = 1
  }
}).finally(() => {
  process.exit(exitCode)
})
