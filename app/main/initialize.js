/**
* initialize when app ready
*/

const getAppEnv = require('./getAppEnv');
const createSystemTray = require('./createSystemTray');
const createMainWindow = require('./createMainWindow');

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
};
