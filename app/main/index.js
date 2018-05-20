/**
* app entrance
*/

require('../lib/runtimeEx')();
const { app } = require('electron');

/**
 * initialize app
 */
const initialize = require('./initialize');

app.on('ready', () => {
  initialize({
    app,
  });
});
