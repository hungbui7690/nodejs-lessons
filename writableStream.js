// WRITABLE STREAM:
// - check pic: overflow
// - back pressure: whenever we have the hose (pipe)
// - high water mark: how much water the hose can handle

const { createReadStream, createWriteStream } = require('fs')
const readStream = createReadStream('./Funny Cat.mp4')
const writeStream = createWriteStream('./copy.mp4')

readStream.on('data', (chunk) => {
  writeStream.write(chunk)
})

readStream.on('error', (err) => {
  console.log('An Error has Occurred', err)
})

readStream.on('end', () => {
  writeStream.end()
})

writeStream.on('close', () => {
  process.stdout.write('file copied \n')
})
