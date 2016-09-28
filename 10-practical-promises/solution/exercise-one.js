'use strict';

var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem one stanza one (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-01.txt', function (err, stanza) {
  //   console.log('-- A. callback version --');
  //   blue(stanza);
  // });

  // promise version
  var fileRead = promisifiedReadFile('poem-one/stanza-01.txt')

  fileRead.then(stanza => blue(stanza));

  // alternatively
  // promisifiedReadFile('poem-one/stanza-01.txt')
  //   .then(function (text) { blue(text) });
  //                     or
  // promisifiedReadFile('poem-one/stanza-01.txt')
  //   .then(text => blue(text));

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log poem one stanza two and three, in any order
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- B. callback version (stanza two) --');
  //   blue(stanza2);
  // });
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- B. callback version (stanza three) --');
  //   blue(stanza3);
  // });

  // promise version
  promisifiedReadFile('poem-one/stanza-02.txt').then(blue);
  promisifiedReadFile('poem-one/stanza-03.txt').then(blue);

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log poem one stanza two and *then* read & log stanza three
   *    log 'done' when both are done
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log('-- C. callback version (stanza two) --');
  //   blue(stanza2);
  //   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //     console.log('-- C. callback version (stanza three) --');
  //     blue(stanza3);
  //     console.log('-- C. callback version done --');
  //   });
  // });

  // promise version (hint: don't need to nest `then` calls)
  var stanza2Read = promisifiedReadFile('poem-one/stanza-02.txt');
  var stanza3Read = promisifiedReadFile('poem-one/stanza-03.txt');

  stanza2Read
    .then(function(stanza2) {
      blue(stanza2);
      return stanza3Read;
    })
    .then(function (stanza3) {
      blue(stanza3);
    })
    .then(() => console.log('done'))
    .catch(() => console.log('done'));

    Promise.all([stanza2Read, stanza3Read])
      .spread(function (stanza) {
        blue(stanza)
      })
      .catch(function (err) {
        console.log('one of em failed', err)
      })

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log poem one stanza four or an error if it occurs
   *
   */

  // callback version
  // readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
  //   console.log('-- D. callback version (stanza four) --');
  //   if (err) magenta(err);
  //   else blue(stanza4);
  // });

  // promise version
  promisifiedReadFile('poem-one/wrong-file-name.txt')
    .then(blue)
    .catch(magenta);


}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log('-- E. callback version (stanza three) --');
  //   if (err) return magenta(err);
  //   blue(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log('-- E. callback version (stanza four) --');
  //     if (err2) return magenta(err2);
  //     blue(stanza4);
  //   });
  // });

  var readStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');
  var readStanza4 = promisifiedReadFile('poem-one/wrong-file-name.txt');

  // promise version
  readStanza3
    .then(stanza3 => {
      blue(stanza3);
      return readStanza4;
    })
    .then(blue)
    .catch(magenta);


}

function problemF () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *    always log 'done' when everything is done
   *
   */

  // // callback version
  readFile('poem-one/stanza-03.txt', function (err, stanza3) {
    console.log('-- F. callback version (stanza three) --');
    if (err) {
      magenta(err);
      console.log('-- F. callback version done --');
      return;
    }
    blue(stanza3);
    readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
      console.log('-- F. callback version (stanza four) --');
      if (err2) magenta(err2);
      else blue(stanza4);
      console.log('-- F. callback version done --');
    });
  });

  var readStanza3 = promisifiedReadFile('poem-one/stanza-03.txt');
  var readStanza4 = promisifiedReadFile('poem-one/wrong-file-name.txt');

  // promise version
  readStanza3
    .then(stanza3 => {
      blue(stanza3);
      return readStanza4;
    })
    .then(blue)
    .catch(magenta)
    .then(function () {
      console.log('done');
    });


}
