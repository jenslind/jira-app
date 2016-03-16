import { Component, View } from 'angular2/core'
import { FormBuilder, Validators } from 'angular2/common'
import { ipcRenderer } from 'electron'
import '../scss/modules/_settings'

@Component({
  selector: 'settings'
})
@View({
  template: require('../templates/settings.template')
})
export default class SettingsComponent {
  constructor(fb: FormBuilder) {
    this.fb = fb
    this.user = ipcRenderer.sendSync('isAuthed')

    this.settingsForm = this.fb.group({
      jql: ['']
    })
  }
}
