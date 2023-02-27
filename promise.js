const p = new Promise((resolve, reject) => {
  let err = false

  // kick out some async work ...
  setTimeout(() => {
    if (!err) {
      resolve({ user: 'Joe Doe' })
    } else reject(new Error('Error Message'))
  }, 2000)
})

p.then((result) => console.log(result)).catch((err) => console.log(err))
