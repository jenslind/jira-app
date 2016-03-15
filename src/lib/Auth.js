'use strict'

const keytar = require('keytar')
const storage = require('electron-json-storage')

export default Auth {

  static auth(info) {
    storage.set('authSettings', {
      baseUrl: info.baseUrl,
      user: info.user
    }, () => {
      keytar.addPassword('Minira', info.user, info.pass)
    })
  }

  static getAuth() {
    const settings = storage.get('authSettings')
    const pass = keytar.getPassword('Minira', settings.user)
    return {
      baseUrl: settings.baseUrl,
      user: settings.user,
      pass: pass
    }
  }

}
