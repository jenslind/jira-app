import { Subject } from 'rxjs/Subject'
import { ipcRenderer } from 'electron'
import { NgZone } from 'angular2/core'

export default class JiraService {
  constructor(zone: NgZone) {
    this.openIssues = new Subject()
    this.openIssues$ = this.openIssues.asObservable()
    this.zone = zone

    this.onOpenIssues()
  }

  onOpenIssues() {
    let self = this
    ipcRenderer.on('issues', (event, issues) => {
      self.zone.run(() => {
        self.openIssues.next(issues)
      })
    })
  }
}
