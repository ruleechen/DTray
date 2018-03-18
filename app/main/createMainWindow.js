/*
* create mainWindow
*/

const url = require('url');
const path = require('path');
const { BrowserWindow } = require('electron');
const getAppIco = require('./getAppIco');

let mainWindow;

const createMainWindow = ({
  appEnv,
  trayState,
}) => {
  if (mainWindow) {
    return mainWindow;
  }

  mainWindow = new BrowserWindow({
    icon: getAppIco(),
    width: 300,
    height: 500,
    show: false,
    // frame: false,
    hasShadow: false,
    // thickFrame: false,
    transparent: true,
    webPreferences: {
      webaudio: true,
      nativeWindowOpen: true,
    },
  });

  // mainWindow.setMenu(null);

  mainWindow.loadURL(url.format({
    pathname: path.resolve(__dirname, '../views/main/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  /**
   * bind events
   */
  let eventSubscriptions = [];

  eventSubscriptions.push(
    trayState.onEx('showApp', () => {
      mainWindow.show();
    })
  );

  mainWindow.on('closed', () => {
    eventSubscriptions.forEach((subscription) => {
      subscription.dispose();
    });
    eventSubscriptions = null;
    mainWindow = null;
  });

  // ret
  return mainWindow;
};

module.exports = createMainWindow;
