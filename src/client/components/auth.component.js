import { Component, View } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { Router } from 'angular2/router'
import JiraService from '../services/jira.service'
import { ipcRenderer } from 'electron'
import '../scss/modules/_auth'

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

    this.hideLoading = true
  }

  auth() {
    this.hideLoading = false

    let self = this
    setTimeout(() => {
      const success = ipcRenderer.sendSync('auth', this.authForm.value)
      if (success) {
        self.router.navigateByUrl('/')
      } else {
        self.hideLoading = true
      }
    }, 500)
  }
}
