'use strict'

const keytar = require('keytar')
const storage = require('electron-json-storage')
const got = require('got')

class Auth {

  static test (info) {
    return got(info.baseUrl + '/rest/api/2/myself', {
      auth: info.user + ':' + info.pass,
      json: true
    })
  }

  static auth (info) {
    return Auth.test(info)
      .then((res) => {
        storage.set('authSettings', {
          baseUrl: info.baseUrl,
          user: info.user,
          userAvatar: res.body.avatarUrls['48x48']
        }, () => {
          keytar.addPassword('Minira', info.user, info.pass)
          Promise.resolve(true)
        })
      })
  }

  static getAuth (cb) {
    storage.get('authSettings', (err, settings) => {
      if (!Object.keys(settings).length || err) return cb(false)
      const pass = keytar.getPassword('Minira', settings.user)
      if (!pass) return cb(false)

      return cb({
        baseUrl: settings.baseUrl,
        user: settings.user,
        pass: pass,
        avatar: settings.userAvatar
      })
    })
  }

  static unAuth (cb) {
    storage.get('authSettings', (err, settings) => {
      if (err) return cb(false)
      storage.remove('authSettings', (err) => {
        if (err) return cb(false)
        keytar.deletePassword('Minira', settings.user)
        cb(true)
      })
    })
  }

}

module.exports = Auth
