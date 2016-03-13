import { Component } from 'angular2/core'
import '../scss/modules/_suggest'

@Component({
  selector: 'suggest',
  inputs: ['haystack', 'control'],
  template: `<input type="text" class="suggest__input" (input)="getSuggestion($event)" [ngFormControl]="control">
  <div class="suggest__suggestion">{{suggestion}}</div>`
})
export default class Suggest {
  constructor() {
    this.suggestion = ''
  }

  getSuggestion(event) {
    let self = this
    if (!event.target.value) return this.suggestion = null
    let regex = new RegExp('^' + event.target.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i')
    self.suggest = ''
    for (let i = 0, len = self.haystack.length; i < len; i++) {
      if (regex.test(self.haystack[i])) {
        self.suggest = self.haystack[i]
      }
    }
    self.suggestion = (self.suggest) ? self.suggest : ''
  }
}
