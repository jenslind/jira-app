import { Component, View } from 'angular2/core'
import JiraService from '../services/jira.service'

@Component({
  selector: 'issues'
})
@View({
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
