import { Component, View } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'
import JiraService from '../services/jira.service'
import NavService from '../services/nav.service'
import { ipcRenderer } from 'electron'
import '../scss/modules/_issues'

@Component({
  selector: 'issues'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/issues.template')
})
export default class IssuesComponent {
  constructor (jira: JiraService, nav: NavService) {
    this.jira = jira
    this.issues = []
    this.hideZero = true
    this.hideLoading = true

    nav.show('settings').hide('issues')
  }

  fillLoad (event) {
    this.loadingPosition = 'top: ' + (event.clientY - 50) + 'px; left: ' + event.clientX + 'px;'
    this.hideLoading = false
  }

  ngOnInit () {
    let self = this
    this.jira.issues$.subscribe(issues => {
      self.issues = issues
      if (!issues.length) self.hideZero = false
    })
    this.settings = ipcRenderer.sendSync('getSettings')
    this.jira.getIssues(this.settings.issueQuery)
  }
}
