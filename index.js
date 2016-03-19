'use strict'

const menubar = require('menubar')
const Jira = require('./src/lib/Jira.js')
const Auth = require('./src/lib/Auth.js')
const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

const mb = menubar({
  'preload-window': true,
  'transparent': true,
  'resizable': false
})
let jira = null

mb.on('ready', () => {
  // Open dev-tools
  mb.window.openDevTools();

  // Get many issues
  ipc.on('getIssues', (event, jql) => {
    jira.getIssues(jql)
      .then(issues => mb.window.webContents.send('issues', issues))
  })

  // Get a specific jira issue
  ipc.on('getIssue', (event, id) => {
    jira.getIssue(id)
      .then(issue => event.returnValue = issue)
  })

  // Get assignable users to a issue
  ipc.on('getAssignable', (event, issueId) => {
    jira.getAssignable(issueId)
      .then(assignable => event.returnValue = assignable)
  })

  // Assign user to a issue
  ipc.on('assignUser', (event, data) => {
    jira.assignUser(data.issue, data.user)
  })

  ipc.on('getTransitions', (event, issueId) => {
    jira.getTransitions(issueId)
      .then(transitions => event.returnValue = transitions)
  })

  ipc.on('doTransition', (event, data) => {
    jira.transition(data.issueId, data.transitionId)
  })

  ipc.on('isAuthed', (event) => {
    Auth.getAuth(success => {
      if (!jira && success) jira = new Jira(success)
      event.returnValue = success
    })
  })

  ipc.on('auth', (event, info) => {
    Auth.auth(info)
      .then(res => {
        event.returnValue = true
      })
      .catch(err => {
        event.returnValue = false
      })
  })

  ipc.on('unAuth', (event) => {
    Auth.unAuth((done) => {
      event.returnValue = done
    })
  })

  ipc.on('updateSettings', (event, data) => {
    storage.set('settings', data)
  })

  ipc.on('getSettings', (event) => {
    storage.get('settings', (err, settings) => {
      event.returnValue = settings
    })
  })
})
