import { Component, View } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { RouteParams } from 'angular2/router'
import JiraService from '../services/jira.service'
import Suggest from './suggest.component'

@Component({
  selector: 'issue'
})
@View({
  directives: [Suggest],
  template: require('../templates/issue.template')
})
export default class IssueComponent {
  constructor(jira: JiraService, routeParams: RouteParams, fb: FormBuilder) {
    this.jira = jira
    this.params = routeParams.params
    this.issue = {}
    this.assignable = []
    this.fb = fb
  }

  getAssignable() {
    const users = []
    for (let i = 0, len = this.assignable.length; i < len; i++) {
      users.push(this.assignable[i].name)
    }
    return users
  }

  assignUser() {
    if (!this.assignForm.status === 'INVALID') return
    const user = this.assignForm.controls.assigned.value
    this.jira.assignUser(this.issue.self, user)
  }

  getStatuses() {
    let statuses = []
    for (let i, len = this.statuses.length; i < len; i++) {
      if (this.statuses[i].id === this.issuetype.id) {
        statuses = this.statuses[i].statuses
      }
    }
    return statuses
  }

  ngOnInit() {
    this.jira.issue$.subscribe(issue => this.issue = issue)
    this.jira.getIssue(this.params.issueId)
    this.assignable = this.jira.getAssignable(this.issue.key)
    this.statuses = this.jira.getStatuses(this.issue.fields.project.id)

    this.assignForm = this.fb.group({
      assigned: [this.issue.fields.assignee.name, Validators.required]
    })
  }
}
