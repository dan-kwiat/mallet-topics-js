const execPromise = require('exec-promise')

const defaultFilePrefix = `./${Date.now()}`

const defaultImportOpts = {
  malletDataFile: `${defaultFilePrefix}_data.mallet`,
  stopFile: undefined,
}

const importDir = (mallet, dataDir, opts) => {
  const options = { ...defaultImportOpts, ...opts }
  return execPromise(`\
    ${mallet} import-dir \
    --input ${dataDir} \
    --output ${options.malletDataFile} \
    --keep-sequence \
    --remove-stopwords \
    ${options.stopFile !== undefined ? `--extra-stopwords ${options.stopFile}` : ''} \
  `).then(() => ({
    malletDataFile: options.malletDataFile,
  }))
}

module.exports = importDir
