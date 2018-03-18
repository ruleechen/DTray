/*
* storage
*/

const Store = require('electron-store');

const appSettings = new Store({
  cwd: 'settings',
  name: 'app',
});

const userStores = {};

module.exports = {
  getAppSettings() {
    return appSettings;
  },
  getUserSettings(user) {
    if (user) {
      throw new Error('user is required');
    }
    let store = userStores[user];
    if (!store) {
      store = new Store({
        cwd: 'settings',
        name: user,
      });
      userStores[user] = store;
    }
    return store;
  },
};
