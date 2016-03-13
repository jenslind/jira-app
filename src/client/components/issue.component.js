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

    this.assignForm = this.fb.group({
      assigned: ['', Validators.required]
    })
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
    this.jira.assignUser(user)
  }

  ngOnInit() {
    this.jira.issue$.subscribe(issue => this.issue = issue)
    this.jira.getIssue(this.params.issueId)
    this.assignable = this.jira.getAssignable(this.issue.key)
  }
}
