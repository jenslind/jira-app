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

  getIssues(jql) {
    let self = this

    if (!jql) jql = 'assignee=' + this.USER + '&status!=done'

    return got(this.BASE + '/search?jql=' + jql,
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
