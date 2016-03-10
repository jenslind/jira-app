'use strict'

const got = require('got')

class Jira {

  constructor(base, user) {
    this.BASE = ''
    this.USER = ''
    this.USER_PASS = ''
  }

  getAuth() {
    return this.USER + ':' + this.USER_PASS
  }

  getOpenIssues() {
    let self = this

    return got(this.BASE + '/search?jql=assignee=' + this.USER + '&status!=done',
      {
        auth: self.getAuth(),
        json: true
      })
      .then((res) => {
        return res.body.issues
      })
  }

}

module.exports = Jira
