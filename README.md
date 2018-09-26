# Mallet Topics

A javascript wrapper for the [MALLET](http://mallet.cs.umass.edu/) command line tool for topic modelling. Really? Yeah.

## Dependencies

### [MALLET 2.0.8](http://mallet.cs.umass.edu/download.php)

### [Java](https://www.java.com/download/)


## Installation

```
npm install --save mallet-topics
```

## Example

```javascript
const { importDir, trainTopics } = require('mallet-topics')

const malletExecutable = '/path/to/mallet-2.0.8/bin/mallet'
const dataDir = '/path/to/dir/containing/textfiles'

importDir(
  malletExecutable,
  dataDir,
)
.then(({ malletDataFile }) => {
  console.log(`Successfully imported data into ${malletDataFile}`)
  return malletDataFile
})
.then(malletDataFile => trainTopics(
  malletExecutable,
  malletDataFile,
))
.then(({ topicKeysFile, docTopicsFile }) => {
  console.log(`Successfully trained topics. Have a look at ${topicKeysFile} and ${docTopicsFile}`)
})
.catch(err => {
  console.log(err.message)
})
```

## Docs

#### `importDir(mallet, dataDir, options)`

Returns a promise which resolves when data is successfully imported to MALLET format.  The resolve value is an object with a property `malletDataFile` which points to the newly created `.mallet` file.

* `mallet` - absolute path to executable e.g. `/path/to/mallet-2.0.8/bin/mallet`
* `dataDir` - absolute path to directory of text files to classify (one file per document)
* `options`
  * `malletDataFile` - filepath to write data in MALLET format (default ```./${Date.now()}_data.mallet```)
  * `stopFile` - path to file containing newline-separated stopwords to omit from classification
  * `onStdData(stdType, msg)` - function to handle data sent to `stdout` or `stderr` from MALLET child process (default `(stdType, msg) => console.log(msg.toString())`)


#### `trainTopics(mallet, malletDataFile, options)`

Returns a promise which resolves when topics are successfully generated.  The resolve value is an object with properties `topicKeysFile` and `docTopicsFile` which contain the generated topics and document topic scores respectively.

* `mallet` - absolute path to executable e.g. `/path/to/mallet-2.0.8/bin/mallet`
* `malletDataFile` - filepath to data file created by `importDir`
* `options`
  * `numTopics` - number of topics to generate (default `10`)
  * `numIterations` - number of sampling iterations (default `100`)
  * `topicKeysFile` - filepath to write topics in tab-separated format (default ```./${Date.now()}_topics.tsv```)
  * `docTopicsFile` - filepath to write topic scores for each document in tab-separated format (default ```./${Date.now()}_doc_topics.tsv```)
  * `optimizeInterval` - number of iterations between hyperparameter optimizations (default `undefined`)
  * `optimizeBurnIn` - number of iterations before hyperparameter optimization begins (default `2*optimizeInterval`)
  * `onStdData(stdType, msg)` - function to handle data sent to `stdout` or `stderr` from MALLET child process (default `(stdType, msg) => console.log(msg.toString())`)
