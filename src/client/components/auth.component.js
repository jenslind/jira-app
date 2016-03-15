import { Component, View } from 'angular2/core'
import JiraService from '../services/jira.service'

@Component({
  selector: 'auth'
})
@View({
  template: require('../templates/auth.template')
})
export default class IssuesComponent {
  constructor(jira: JiraService) {

  }
}
