import { Component, View } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { Router } from 'angular2/router'
import NavService from '../services/nav.service'
import { ipcRenderer } from 'electron'
import '../scss/modules/_settings'

@Component({
  selector: 'settings'
})
@View({
  template: require('../templates/settings.template')
})
export default class SettingsComponent {
  constructor(fb: FormBuilder, nav: NavService, router: Router) {
    this.fb = fb
    this.router = router
    this.user = ipcRenderer.sendSync('isAuthed')

    this.settingsForm = this.fb.group({
      jql: ['']
    })

    nav.show('settings').show('issues')
  }

  unlink() {
    let done = ipcRenderer.sendSync('unAuth')
    if (done) this.router.navigateByUrl('/auth')
  }
}
