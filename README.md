# mallet-topics-js

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

const malletExecutable = '~/Downloads/mallet-2.0.8/bin/mallet'

importDir(
  malletExecutable,
  './data',
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

`importDir(mallet, dataDir, opts)`

Returns a promise which resolves when data is successfully imported to MALLET format.  The resolve value is an object with a property `malletDataFile` which points to the newly created `.mallet` file.

* `mallet` - path to executable e.g. `~/Downloads/mallet-2.0.8/bin/mallet`
* `dataDir` - path to directory of text files to classify (one file per document)
* `opts`
  * `malletDataFile` - filepath to write data in MALLET format (default `./${Date.now()}_data.mallet`)
  * `stopFile` - optional filepath containing newline-separated stopwords to omit from classification


`trainTopics(mallet, malletDataFile, opts)`

Returns a promise which resolves when topics are successfully generated.  The resolve value is an object with properties `topicKeysFile` and `docTopicsFile` which contain the generated topics and document topic scores respectively.

* `mallet` - path to executable e.g. `~/Downloads/mallet-2.0.8/bin/mallet`
* `malletDataFile` - filepath to data file created by `importDir`
* `opts`
  * `numTopics` - number of topics to generate (default `10`)
  * `numIterations` - number of sampling iterations (default `100`)
  * `optimizeInterval` - number of iterations between hyperparameter optimizations (default `undefined` - no optimization)
  * `optimizeBurnIn` - number of iterations before hyperparameter optimization begins (default `2*optimizeInterval`)
  * `topicKeysFile` - filepath to write topics in tab-separated format (default `./${Date.now()}_topics.tsv`)
  * `docTopicsFile` - filepath to write topic scores for each document in tab-separated format (default `./${Date.now()}_doc_topics.tsv`)
