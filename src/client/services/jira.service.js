import { Subject } from 'rxjs/Subject'
import { ipcRenderer } from 'electron'
import { NgZone } from 'angular2/core'

export default class JiraService {
  constructor(zone: NgZone) {
    this.issues = new Subject()
    this.issue = new Subject()
    this.issues$ = this.issues.asObservable()
    this.issue$ = this.issue.asObservable()
    this.zone = zone

    this.onIssues()
    this.onIssue()
  }

  getIssues(jql) {
    ipcRenderer.send('getIssues', jql)
  }

  onIssues() {
    let self = this
    ipcRenderer.on('issues', (event, issues) => {
      self.zone.run(() => {
        self.issues.next(issues)
      })
    })
  }

  getIssue(id) {
    ipcRenderer.send('getIssue', id)
  }

  onIssue() {
    let self = this
    ipcRenderer.on('issue', (event, issue) => {
      self.zone.run(() => {
        self.issue.next(issue)
      })
    })
  }

  getAssignable(issueId, cb) {
    let self = this
    ipcRenderer.send('getAssignable', issueId)
    ipcRenderer.on('assignable', (event, data) => {
      self.zone.run(() => {
        cb(data)
      })
    })
  }

  assignUser(issue, user) {
    ipcRenderer.send('assignUser', {issue: issue, user: user})
  }

  getTransitions(issueId) {
    return ipcRenderer.sendSync('getTransitions', issueId)
  }

  doTransition(issueId, transitionId) {
    ipcRenderer.send('doTransition', {issueId, transitionId})
  }

  isAuthed() {
    return ipcRenderer.sendSync('isAuthed')
  }
}
