import { Component, View } from 'angular2/core'
import { ROUTER_DIRECTIVES } from 'angular2/router'
import JiraService from '../services/jira.service'
import '../scss/modules/_issues'

@Component({
  selector: 'issues'
})
@View({
  directives: [ROUTER_DIRECTIVES],
  template: require('../templates/issues.template')
})
export default class IssuesComponent {
  constructor(jira: JiraService) {
    this.jira = jira
    this.issues = []
  }

  ngOnInit() {
    this.jira.openIssues$.subscribe(issues => this.issues = issues)
  }
}
