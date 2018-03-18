/*
* get app env
*/

const fs = require('fs');
const path = require('path');
const log = require('electron-log');
const isDev = require('electron-is-dev');
const osLocale = require('os-locale');
const { getAppSettings } = require('./storage');
const app = require('../app.json');

const getInstallerPath = ({ app }) => (
  path.dirname(app.getPath('exe'))
);

const normalizeLocale = (l) => {
  const locale = (l || '').replace('_', '-');
  return locale.includes('-') ? locale : null;
};

const getSystemLocale = () => {
  const osl = osLocale.sync();
  return normalizeLocale(osl);
};

const setAutoLaunch = ({ app, enable }) => {
  app.setLoginItemSettings({
    openAtLogin: enable,
  });
};

const isAutoLaunchEnabled = ({ app }) => {
  const loginItems = app.getLoginItemSettings();
  return loginItems.openAtLogin;
};

const getAppEnv = ({
  app,
}) => {
  const beforeQuitActions = [];
  const installerPath = getInstallerPath({ app });

  const appEnv = {
    installerPath,
    systemLocale: getSystemLocale(),
    defaultLocale: 'en-US',
    isAutoLaunchEnabled: () => isAutoLaunchEnabled({ app }),
    setAutoLaunch: enable => setAutoLaunch({ app, enable }),
    isDevRun() {
      return isDev || process.argv.includes('--rc-dev-run');
    },
    getEnvName() {
      if (appEnv.isDevRun()) {
        return 'dev';
      }
      const appSettings = getAppSettings();
      const buildEnv = appSettings.get('buildEnv');
      if (brand.buildEnvs.includes(buildEnv)) { // validate
        return buildEnv;
      }
      return 'dev';
    },
    onBeforeQuit(source, action) {
      beforeQuitActions.push({
        source,
        action,
      });
    },
  };

  // autoUpdater only emit "before-quit" event on app
  app.on('before-quit', () => {
    beforeQuitActions.forEach(({ source, action }) => {
      try {
        action();
        log.info(`${source} destroyed`);
      } catch (ex) {
        log.error(`${source} quit error: ${ex.toString()}`);
      }
    });
  });

  log.info(`[appenv] process versions ${JSON.stringify(process.versions)}`);
  log.info(`[appenv] process argv ${JSON.stringify(process.argv)}`);
  log.info(`[appenv] app env ${JSON.stringify(appEnv)}`);

  return appEnv;
};

module.exports = getAppEnv;
