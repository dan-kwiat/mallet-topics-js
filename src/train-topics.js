const execPromise = require('./exec-promise')

const defaultFilePrefix = `./${Date.now()}`

const defaultTrainOpts = {
  numTopics: 10,
  numIterations: 100,
  optimizeInterval: undefined,
  optimizeBurnIn: undefined,
  topicKeysFile: `${defaultFilePrefix}_topics.tsv`,
  docTopicsFile: `${defaultFilePrefix}_doc_topics.tsv`,
}

const trainTopics = (mallet, malletDataFile, opts) => {
  const options = { ...defaultTrainOpts, ...opts }
  return execPromise(`\
    ${mallet} train-topics \
    --input ${malletDataFile} \
    --num-topics ${options.numTopics} \
    --num-iterations ${options.numIterations} \
    ${options.optimizeInterval !== undefined ? `--optimize-interval ${options.optimizeInterval}` : ''} \
    ${options.optimizeBurnIn !== undefined ? `--optimize-burn-in ${options.optimizeBurnIn}` : ''} \
    ${options.topicKeysFile !== undefined ? `--output-topic-keys ${options.topicKeysFile}` : ''} \
    ${options.docTopicsFile !== undefined ? `--output-doc-topics ${options.docTopicsFile}` : ''} \
  `).then(() => ({
    topicKeysFile: options.topicKeysFile,
    docTopicsFile: options.docTopicsFile,
  }))
}

module.exports = trainTopics
