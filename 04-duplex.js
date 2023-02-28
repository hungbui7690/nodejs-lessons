// PIPE, DUPLEX & TRANSFORM STREAMS
// DUPLEX

// (1) get Duplex
const { PassThrough, Duplex } = require('stream')
const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')
const writeStream = createWriteStream('./copy.mp4')

const report = new PassThrough()

// (2) Duplex has _read(), _write(), _final
class Throttle extends Duplex {
  constructor(ms) {
    super()
    this.delay = ms
  }

  _read() {}
  _write(chunk, encoding, callback) {
    this.push(chunk)
    setTimeout(callback, this.delay)
  }
  _final() {
    this.push(null)
  }
}

// (3)
const throttle = new Throttle(100)

let total = 0
report.on('data', (chunk) => {
  total += chunk.length
  console.log('bytes : ', total)
})

// (4) with this, we can manipulate > we can clearly see the delay
readStream.pipe(throttle).pipe(report).pipe(writeStream)
