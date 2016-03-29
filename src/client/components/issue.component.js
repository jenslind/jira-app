import { Component, View, ComponentInstruction } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { RouteParams, CanActivate } from 'angular2/router'
import { appInjector } from '../app.injector'
import JiraService from '../services/jira.service'
import NavService from '../services/nav.service'
import Suggest from './suggest.component'
import '../scss/modules/_issue'
import '../scss/modules/_issue-comments'
import { shell } from 'electron'

@Component({
  selector: 'issue'
})
@View({
  directives: [Suggest],
  template: require('../templates/issue.template')
})
@CanActivate((next: ComponentInstruction) => {
  let jira = appInjector().get(JiraService)
  jira.getIssue(next.params.issueId)

  return new Promise((resolve, reject) => {
    jira.issue$.subscribe((issue) => {
      jira.currentIssue = issue
      resolve(true)
    })
  })
})
export default class IssueComponent {
  constructor (jira: JiraService, routeParams: RouteParams, fb: FormBuilder, nav: NavService) {
    this.jira = jira
    this.params = routeParams.params
    this.issue = this.jira.currentIssue
    this.assignable = []
    this.fb = fb
    this.hideTransitions = true
    this.hideComments = true
    this.addingComment = false
    this.comments = null

    nav.show('settings').show('issues').show('shadow')
  }

  getAssignable () {
    const users = []
    for (let i = 0, len = this.assignable.length; i < len; i++) {
      users.push(this.assignable[i].name)
    }
    return users
  }

  assignUser () {
    if (!this.assignForm.valid) return
    const user = this.assignForm.controls.assigned.value.toLowerCase()
    if (user === this.issue.fields.assignee.name) return
    this.jira.assignUser(this.issue.self, user)
  }

  getPossibleTransitions () {
    let transitions = []
    let len = this.issue.transitions.length
    for (let i = 0; i < len; i++) {
      if (this.issue.transitions[i].to.id !== this.issue.fields.status.id) {
        transitions.push(this.issue.transitions[i])
      }
    }
    return transitions
  }

  doTransition (iId, t) {
    this.jira.doTransition(iId, t.id)
    this.issue.fields.status = t.to
    this.transitions = this.getPossibleTransitions()
  }

  openIssue () {
    const URLParts = this.issue.self.split('/')
    let issueURL = URLParts[0] + '//' + URLParts[2]
    issueURL += '/projects/' + this.issue.fields.project.key
    issueURL += '/issues/' + this.issue.key
    shell.openExternal(issueURL)
  }

  showComments () {
    this.jira.getComments(this.issue.key)

    let self = this
    this.comments = null
    this.jira.comments$.subscribe((comments) => {
      if (comments.comments) {
        self.comments = comments.comments
      } else {
        self.comments.push(JSON.parse(comments))
        self.addingComment = false
        setTimeout(() => { document.querySelector('.issue__comments .issue__comment:last-child').scrollIntoView() }, 100)
      }
      self.hideComments = false
    })
  }

  addComment () {
    this.addingComment = true
    let comment = this.commentForm.value
    comment.issueKey = this.issue.key
    comment.body = comment.body.replace(/\n/g, '\\n')
    this.jira.addComment(comment)
    this.commentForm.controls.body.updateValue('')
  }

  ngOnInit () {
    let self = this
    this.jira.getAssignable(this.issue.key, (data) => {
      self.assignable = data
    })

    this.transitions = this.getPossibleTransitions()

    let assignee = (this.issue.fields.assignee) ? this.issue.fields.assignee.name : ''
    this.assignForm = this.fb.group({
      assigned: [assignee, Validators.required]
    })

    this.commentForm = this.fb.group({
      body: ['', Validators.required]
    })
  }

  _strAsDate (str) {
    return new Date(str)
  }
}
