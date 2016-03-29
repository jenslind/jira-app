'use strict'

const menubar = require('menubar')
const Jira = require('./lib/Jira.js')
const Auth = require('./lib/Auth.js')
const autoUpdate = require('./lib/update.js')
const ipc = require('electron').ipcMain
const storage = require('electron-json-storage')

const mb = menubar({
  'preload-window': true,
  'transparent': true,
  'resizable': false
})
let jira = null

mb.on('ready', () => {
  // Auto-update
  autoUpdate(mb.app.getVersion())

  // Get many issues
  ipc.on('getIssues', (event, jql) => {
    jira.getIssues(jql)
      .then((issues) => mb.window.webContents.send('issues', issues))
  })

  // Get a specific jira issue
  ipc.on('getIssue', (event, id) => {
    jira.getIssue(id)
      .then((issue) => mb.window.webContents.send('issue', issue))
  })

  ipc.on('getComments', (event, id) => {
    jira.getComments(id)
      .then((comments) => mb.window.webContents.send('comments', comments))
  })

  ipc.on('addComment', (event, comment) => {
    jira.addComment(comment)
      .then((newComment) => mb.window.webContents.send('commentAdded', newComment))
  })

  // Get assignable users to a issue
  ipc.on('getAssignable', (event, issueId) => {
    jira.getAssignable(issueId)
      .then((assignable) => mb.window.webContents.send('assignable', assignable))
  })

  // Assign user to a issue
  ipc.on('assignUser', (event, data) => {
    jira.assignUser(data.issue, data.user)
  })

  ipc.on('getTransitions', (event, issueId) => {
    jira.getTransitions(issueId)
      .then((transitions) => {
        event.returnValue = transitions
      })
  })

  ipc.on('doTransition', (event, data) => {
    jira.transition(data.issueId, data.transitionId)
  })

  ipc.on('isAuthed', (event) => {
    Auth.getAuth((success) => {
      if (!jira && success) jira = new Jira(success)
      event.returnValue = success
    })
  })

  ipc.on('auth', (event, info) => {
    Auth.auth(info)
      .then((res) => {
        event.returnValue = true
      })
      .catch(() => {
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
      event.returnValue = (!err) ? settings : null
    })
  })
})
