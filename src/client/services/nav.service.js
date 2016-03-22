export default class NavService {
  constructor () {
    this.button = {}
    this.button.settings = true
    this.button.issues = true
    this.button.shadow = true
  }

  show (btn) {
    this.button[btn] = false
    return this
  }

  hide (btn) {
    this.button[btn] = true
    return this
  }

  get () {
    return this.button
  }
}
