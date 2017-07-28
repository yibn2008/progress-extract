'use strict'

const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const assert = require('assert')
const extract = require('..')

describe('test extract', function () {
  this.timeout(30000)

  let cacheDir

  beforeEach(() => {
    cacheDir = path.join(__dirname, '.cache')
    if (fs.existsSync(cacheDir)) {
      rimraf.sync(cacheDir)
    }
    fs.mkdirSync(cacheDir)
  })

  it('should extract zip with progress bar', async function () {
    let source = path.join(__dirname, 'fixtures.zip')

    await extract(source, cacheDir)
  })

  it('should extract tar.gz with progress bar', async function () {
    let source = path.join(__dirname, 'fixtures.tar.gz')

    await extract(source, cacheDir)
  })
})
