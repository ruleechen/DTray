/*
* create systemTray
*/

const path = require('path');
const log = require('electron-log');
const { Menu, Tray } = require('electron');
const getAppIco = require('./getAppIco');
const appJson = require('../app.json');

class SystemTray extends Tray {
  constructor(options) {
    super(options);

    this._quitRequested = false;
    this._eventSubscriptions = [];

    this.initializeMenus();

    this._eventSubscriptions.push(
      this.onEx('double-click', () => this.showApp()),
      this.onEx('click', () => this.popUpContextMenu())
    );
  }

  initializeMenus() {
    // tooltip
    this.setToolTip(appJson.productName);
    // context menu
    this.setContextMenu(Menu.buildFromTemplate([{
      label: 'Open',
      click: () => this.showApp(),
    }, {
      label: 'Exit',
      role: 'quit',
    }]));
  }

  showApp() {
    this.emit('showApp');
  }

  destroy() {
    this._quitRequested = true;
    this._eventSubscriptions.forEach((subscription) => {
      subscription.dispose();
    });
  }

  get quitRequested() {
    return !!this._quitRequested;
  }
}

let systemTray;

const createSystemTray = ({
  appEnv,
}) => {
  if (systemTray) {
    return systemTray;
  }

  systemTray = new SystemTray(getAppIco());

  appEnv.onBeforeQuit('[tray]', () => {
    if (systemTray) {
      systemTray.destroy();
      systemTray = null;
    }
  });

  return systemTray;
};

module.exports = createSystemTray;
