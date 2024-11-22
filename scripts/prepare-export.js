// SPDX-FileCopyrightText: 2023 Justin Bingham <justin@bingham.id>
// SPDX-FileCopyrightText: 2023 elf Pavlik <elf-pavlik@hackers4peace.net>
//
// SPDX-License-Identifier: MIT

const fs = require('fs')
const filePath = require('path')

const SNIPPETS_PATH = 'proposals/primer/snippets'

// delete existing dist if exists
if (fs.existsSync('dist')) {
  fs.rmSync('dist',{ recursive: true })
}

// create dist directory
fs.mkdirSync('dist')

// prepare json

// create full URL based on host and filename
function pathToUrl(host, path, fileName) {
  fileName = filePath.basename(fileName, filePath.extname(fileName))
  let url = `https://${host}`
  if (path !== '') {
    url += path
  }
  if (host == fileName ) {
    url += '/'
  } else {
    url += '/' + fileName
  }
  return url
}

// read content of each file for given host
function processHost(acc, host, path = '') {
  for (const entry of fs.readdirSync(filePath.join(SNIPPETS_PATH, host, path), { withFileTypes: true })) {
   if (entry.isDirectory()) {
     processHost(acc, host, path + '/' + entry.name)
   } else {
     acc[pathToUrl(host, path, entry.name)] = fs.readFileSync(filePath.join(SNIPPETS_PATH, host, path, entry.name), 'utf-8')
   }
  }
}

// merge all the hosts
const data = {}
const hosts = fs.readdirSync(SNIPPETS_PATH).filter(name => {
  return name.match('.example')
})

for (const host of hosts) {
  processHost(data, host)
}

// write json
fs.writeFileSync('dist/index.json', JSON.stringify(data))
