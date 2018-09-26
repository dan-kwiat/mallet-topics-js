const { exec } = require('child_process')

const execPromise = (cmd, opts={}) => {
  return new Promise((resolve, reject) => {
    exec(
      cmd,
      opts,
      (err, stdout, stderr) => {
        if (err) {
          return reject(err)
        }
        return resolve(stdout, stderr)
      }
    )
  })
}

module.exports = execPromise
