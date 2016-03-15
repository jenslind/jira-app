import { Component, View } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { Router } from 'angular2/router'
import JiraService from '../services/jira.service'
import { ipcRenderer } from 'electron'

@Component({
  selector: 'auth'
})
@View({
  template: require('../templates/auth.template')
})
export default class AuthComponent {
  constructor(jira: JiraService, fb: FormBuilder, router: Router) {
    this.fb = fb
    this.router = router
    this.authForm = this.fb.group({
      baseUrl: ['', Validators.required],
      user: ['', Validators.required],
      pass: ['', Validators.required]
    })
  }

  auth() {
    const success = ipcRenderer.sendSync('auth', this.authForm.value)
    if (success) {
      this.router.navigateByUrl('/')
    }
  }
}
