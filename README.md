# imagedir-diff

> A library that compares between screenshots and their baselines and outputs their diff. 
> Operates on entire directory

[![Build Status](https://travis-ci.org/coder-on-deck/imagedir-diff.svg?branch=master)](https://travis-ci.org/coder-on-deck/imagedir-diff)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

# Assumptions 

The test reads each image in the baselines directory and finds the correlating one in screenshots.   
So if you have a new screenshot without baseline, it will be ignored.    
If you have a baseline without a screenshot, it will fail. 


**Note**: supports only png files.

# Command Line Usage 

```bash
imagedir-diff --screenshots tests/images/screenshots --baselines tests/images/baselines --diffs tests/images/diffs
```

Will print all passed images and all failed images. For example:

```json
{
  "passed": [
    "download.png",
    "logo.png",
    "hello.png"
  ],
  "failed": []
}
```

Will exit with code 0 if all passed. Otherwise with exit code 1

# Library Usage

```javascript
var imagedirDiff = require('imagedir-diff');
imagedirDiff( {
    diffs: 'tests/images/diffs',
    screenshots: 'tests/images/screenshots',
    baselines: 'tests/images/baselines'
} )
```



# Options
 
  * screenshots - Directory for new screenshots taken. default: `tests/images/screenshots`
  * baselines - Directory for baseline images. default: `tests/images/baselines`
  * diffs - Directory to output diffs. default: `tests/images/diffs`
