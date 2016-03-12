import { Component, View } from 'angular2/core'
import { RouteParams } from 'angular2/router'
import JiraService from '../services/jira.service'

@Component({
  selector: 'issue'
})
@View({
  template: require('../templates/issue.template')
})
export default class IssueComponent {
  constructor(jira: JiraService, routeParams: RouteParams) {
    this.jira = jira
    this.params = routeParams.params
    this.issue = {}
    this.assignable = []
  }

  ngOnInit() {
    this.jira.issue$.subscribe(issue => this.issue = issue)
    this.jira.getIssue(this.params.issueId)
    this.assignable = this.jira.getAssignable(this.issue.key)
  }
}
