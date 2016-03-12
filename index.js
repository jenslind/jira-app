'use strict'

const menubar = require('menubar')
const Jira = require('./src/app/Jira.js')
const ipc = require('electron').ipcMain

const mb = menubar({'preload-window': true, 'transparent': true})
const jira = new Jira()

mb.on('ready', () => {
  // Open dev-tools
  mb.window.openDevTools();

  // Get jira issues
  jira.getIssues()
    .then(issues => {
      mb.window.webContents.send('issues', issues)
    })

  // Get a specific jira issue
  ipc.on('getIssue', (event, id) => {
    let jql = 'id=' + id
    jira.getIssues(jql)
      .then(issues => event.returnValue = issues[0])
  })

  // Get assignable users to a issue
  ipc.on('getAssignable', (event, issueId) => {
    jira.getAssignable(issueId)
      .then(assignable => event.returnValue = assignable)
  })
})
