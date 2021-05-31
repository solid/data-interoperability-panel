const fs = require('fs')
const path = require('path')

SNIPPETS_PATH = 'proposals/primer/snippets'
IGNORE_HOSTS = [ 'solidshapes.example' ]

// delete existing dist
fs.rmdirSync('dist',{ recursive: true })

// create dist directory
fs.mkdirSync('dist')

// prepare json

// create full URL based on host and filename
function pathToUrl(host, fileName) {
  fileName = path.basename(fileName, '.ttl')
  let url = `https://${host}/`
  if (host !== fileName ) {
    url += fileName
  }
  return url
}

// read content of each file for given host
function processHost(host) {
  const data = {}
  for (const file of fs.readdirSync(path.join(SNIPPETS_PATH, host))) {
   data[pathToUrl(host, file)] = fs.readFileSync(path.join(SNIPPETS_PATH, host, file), 'utf-8')
  }
  return data
}

// merge all the hosts
const data = fs.readdirSync(SNIPPETS_PATH).filter(name => {
  return name.match('.example') && !IGNORE_HOSTS.includes(name)
}).reduce((acc, host) => {
  return Object.assign(acc,(processHost(host)))
}, {})

// write json
fs.writeFileSync('dist/index.json', JSON.stringify(data))
