import { Component, View } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'
import JiraService from '../services/jira.service'
import NavService from '../services/nav.service'
import '../scss/modules/_issues'

@Component({
  selector: 'issues'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/issues.template')
})
export default class IssuesComponent {
  constructor(jira: JiraService, nav: NavService) {
    this.jira = jira
    this.issues = []
    this.hideZero = true

    nav.show('settings').hide('issues')
  }

  ngOnInit() {
    let self = this
    this.jira.issues$.subscribe(issues => {
      self.issues = issues
      if (!issues.length) self.hideZero = false
    })
    this.jira.getIssues()
  }
}
