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
    let issue = ipcRenderer.sendSync('getIssue', id)
    this.issue.next(issue)
  }

  getAssignable(issueId) {
    return ipcRenderer.sendSync('getAssignable', issueId)
  }

  assignUser(user) {
    console.log('assign to: ' + user)
  }
}
