'use strict'

const fs = require('fs')
const targz = require('tar.gz2')

TarGz.prototype.extract = bluebird.method(function(source, destination, cb) {
  var def = bluebird.defer();

  // Handle callbacks
  def.promise
    .then(function() {
      if (cb)
        process.nextTick(function() {
          cb();
        });
    })
    .catch(function(err) {
      if (cb)
        process.nextTick(function() {
          cb(err);
        });
    });

  // Create all streams that we need
  var read = fs.createReadStream(source);
  var write = this.createWriteStream(destination);

  // Listen to events
  write.on('error', def.callback);
  write.on('finish', def.callback);
  read.on('error', def.callback);

  // Pipe everything
  read.pipe(write);

  return def.promise;
});

module.exports = function (source, destination, bar) {
  return new Promise((resolve, reject) => {
    try {
      let read = fs.createReadStream(source)
      let write = this.createWriteStream(destination)
      let callback = (err, result) => {
        bar.done(err)

        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }

      // start
      bar.start()

      // bind events
      write.on('error', err => {
        callback(err)
      })
      write.on('finish', () => {
        callback()
      })
      read.on('error', err => {
        callback(err)
      })
      read.on('data', chunk => {
        bar.tick(chunk.length)
      })

      read.pipe(write)
    } catch (err) {
      reject(err)
    }
  })

  // Pipe everything
  read.pipe(write);

  return def.promise;
}
