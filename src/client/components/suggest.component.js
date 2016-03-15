import { Component, ChangeDetectorRef } from 'angular2/core'
import '../scss/modules/_suggest'

@Component({
  selector: 'suggest',
  inputs: ['haystack', 'control', 'value'],
  template: `<input type="text" class="suggest__input" (keyup)="getSuggestion($event)" [value]="value">
  <input type="text" class="suggest__suggestion" [(ngModel)]="suggest" [ngFormControl]="control">`
})
export default class Suggest {
  constructor(cdr: ChangeDetectorRef) {
    this.cdr = cdr
    this.suggest = ''
  }

  ngOnInit() {
    this.suggest = this.control.value
  }

  getSuggestion(event) {
    const enterKey = 13

    let regex = new RegExp('^' + event.target.value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'i')
    this.suggestFound = false
    for (let i = 0, len = this.haystack.length; i < len; i++) {
      if (regex.test(this.haystack[i]) && event.target.value) {
        this.suggestFound = this.haystack[i]
      }
    }

    if (this.suggestFound) {
      this.suggest = this.suggestFound
      if (event.which === enterKey) event.target.value = this.suggest
    } else {
      this.suggest = ''
    }

    this.cdr.detectChanges()
  }
}
