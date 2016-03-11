import { Component, View } from 'angular2/core'
import JiraService from '../services/jira.service'

@Component({
  selector: 'issue'
})
@View({
  template: require('../templates/issue.template')
})
export default class IssueComponent {
  constructor(jira: JiraService) {
    this.jira = jira
  }
}
