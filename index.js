'use strict'

const menubar = require('menubar')
const Jira = require('./src/app/Jira.js')

const mb = menubar({'preload-window': true})
const jira = new Jira()

mb.on('ready', () => {
  // Open dev-tools
  mb.window.openDevTools();

  // Get jira issues
  jira.getOpenIssues()
    .then(issues => {
      mb.window.webContents.send('issues', issues)
    })
})
