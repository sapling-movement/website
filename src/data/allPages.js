const arrayToObject = require('../utils/arrayToObject.js');

module.exports = async function() {

  // require pages
  const modularPages = await require('./modularPages.js')();

  // merge pages into single array
  const arrAllPages = [
    ...modularPages
  ];

  // turn array into object
  // array: [ { id: 'dokument_1', daten: 'xyz' }, { ... } ]
  // gets: { dokument_1: { id: 'dokument_1', daten: 'xyz' }, ... }
  // this step is required for live previews to work
  const objAllPages = arrayToObject(arrAllPages, '_id');

  return objAllPages
}