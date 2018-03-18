/*
* get app ico
*/

const { nativeImage } = require('electron');

module.exports = () => (
  nativeImage.createFromPath('./app.ico')
);
