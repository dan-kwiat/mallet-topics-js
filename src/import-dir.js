const spawnPromise = require('./spawn-promise')

const defaultFilePrefix = `./${Date.now()}`

const defaultImportOpts = {
  malletDataFile: `${defaultFilePrefix}_data.mallet`,
  stopFile: undefined,
  onStdData: (stdType, msg) => console.log(msg.toString()),
}

const importDir = (mallet, dataDir, opts) => {
  const options = { ...defaultImportOpts, ...opts }
  const args = [
    'import-dir',
    '--keep-sequence',
    '--remove-stopwords',
    ...['--input', dataDir],
    ...['--output', options.malletDataFile],
    ...(options.stopFile === undefined ? [] : [ '--extra-stopwords', options.stopFile ]),
  ]

  return spawnPromise(options.onStdData)(
    mallet,
    args
  ).then(() => ({
    malletDataFile: options.malletDataFile,
  }))
}

module.exports = importDir
