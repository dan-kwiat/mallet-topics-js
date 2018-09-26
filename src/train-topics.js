const spawnPromise = require('./spawn-promise')

const defaultFilePrefix = `./${Date.now()}`

const defaultTrainOpts = {
  numTopics: 10,
  numIterations: 100,
  optimizeInterval: undefined,
  optimizeBurnIn: undefined,
  topicKeysFile: `${defaultFilePrefix}_topics.tsv`,
  docTopicsFile: `${defaultFilePrefix}_doc_topics.tsv`,
  onStdData: (stdType, msg) => console.log(msg.toString()),
}

const trainTopics = (mallet, malletDataFile, opts) => {
  const options = { ...defaultTrainOpts, ...opts }
  const args = [
    'train-topics',
    ...['--input', malletDataFile],
    ...['--num-topics', options.numTopics],
    ...['--num-iterations', options.numIterations],
    ...(options.optimizeInterval === undefined ? [] : [ '--optimize-interval', options.optimizeInterval ]),
    ...(options.optimizeBurnIn === undefined ? [] : [ '--optimize-burn-in', options.optimizeBurnIn ]),
    ...(options.topicKeysFile === undefined ? [] : [ '--output-topic-keys', options.topicKeysFile ]),
    ...(options.docTopicsFile === undefined ? [] : [ '--output-doc-topics', options.docTopicsFile ]),
  ]
  return spawnPromise(options.onStdData)(
    mallet,
    args
  ).then(() => ({
    topicKeysFile: options.topicKeysFile,
    docTopicsFile: options.docTopicsFile,
  }))
}

module.exports = trainTopics
