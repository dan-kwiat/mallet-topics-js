const { spawn } = require('child_process')

const spawnPromise = onData => (cmd, args, opts) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(cmd, args, opts)

    childProcess.stdout.on('data', data => {
      onData('stdout', data)
    })

    childProcess.stderr.on('data', data => {
      onData('stderr', data)
    })
    
    childProcess.on('error', err => {
      return reject(err)
    })

    childProcess.on('close', exitCode => {
      if (exitCode === 0) {
        return resolve()
      }
      return reject(exitCode)
    })
  })
}

module.exports = spawnPromise
