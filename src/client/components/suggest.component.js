import { Component } from 'angular2/core'
import '../scss/modules/_suggest'

@Component({
  selector: 'suggest',
  inputs: ['haystack', 'control'],
  template: `<input type="text" class="suggest__input" (keyup)="getSuggestion($event)" [value]="control.value">
  <input type="text" class="suggest__suggestion" [(ngModel)]="suggest" [ngFormControl]="control">`
})
export default class Suggest {
  constructor() {
    this.suggest = ''
  }

  ngOnInit() {
    this.suggest = this.control.value
  }

  getSuggestion(event) {
    const enterKey = 13

    if (!event.target.value) return this.suggest = ''
    let regex = new RegExp('^' + event.target.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i')
    this.suggestFound = false
    for (let i = 0, len = this.haystack.length; i < len; i++) {
      if (regex.test(this.haystack[i])) {
        this.suggestFound = this.haystack[i]
      }
    }

    if (this.suggestFound) {
      if (event.which === enterKey) event.target.value = this.suggest
      this.suggest = this.suggestFound
    } else {
      this.suggest = ''
    }
  }
}
