'use strict'

const debug = require('debug')('progress-extract:bar')
const ProgressBar = require('progress')
const filesize = require('filesize')

class Dot {
  constructor (prefix) {
    this._count = 0
    this._lastTick = 0

    process.stdout.write('  extracting ')
  }

  tick (size) {
    if (size) {
      this._count += size
    }

    if (Date.now() - this._lastTick > 300) {
      process.stdout.write('.')
      this._lastTick = Date.now()
    }
  }

  done (err) {
    if (err) {
      process.stdout.write(' failed\n')
    } else {
      process.stdout.write(' done, total ' + filesize(this._count) + '\n')
    }
  }
}

class Bar {
  constructor () {
    this._bar = null
    this._dot = null
    this._total = 0
  }

  start (total) {
    if (total && typeof total === 'number') {
      this._bar = new ProgressBar('  extracting [:bar] :rate/bps :percent :etas', {
        complete: '=',
        incomplete: ' ',
        width: 25,
        total: total
      })
      this._total = total

      debug('create progress bar with total = %s', total)
    } else {
      this._dot = new Dot()
      debug('create progress dot')
    }
  }

  tick (size) {
    if (this._bar) {
      this._bar.tick(size)
    } else if (this._dot) {
      this._dot.tick(size)
    }
  }

  done (err) {
    if (this._dot) {
      this._dot.done(err)
    }
  }
}

module.exports = Bar
