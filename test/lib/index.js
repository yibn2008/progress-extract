'use strict'

const path = require('path')
const targz = require('./targz')
const Bar = require('./bar')

module.exports = function (source, destination) {
  let bar = new Bar()

  // .tgz or .tar.gz
  if (source.endsWith('.tar.gz') || source.endsWith('.tgz')) {
    return targz(source, destination, bar)
  } else {
    throw new Error('currently does NOT support extract for file type', path.extname(source))
  }
}
