/**
* initialize when app ready
*/

const getAppEnv = require('./getAppEnv');
const createSystemTray = require('./createSystemTray');
const createMainWindow = require('./createMainWindow');
const puppeteer = require('./puppeteer');

module.exports = ({
  app,
}) => {
  /**
   * app env
   */
  const appEnv = getAppEnv({
    app,
  });

  /**
   * systemTray
   */
  const trayState = createSystemTray({
    appEnv,
  });

  /**
   * mainWindow
   */
  const mainWindow = createMainWindow({
    appEnv,
    trayState,
  });

  /**
   * puppeteer server
   */
  const server = puppeteer({
    appEnv,
  });
};
