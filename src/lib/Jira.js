'use strict'

const got = require('got')

class Jira {

  constructor(auth) {
    this.BASE_URL = auth.baseUrl
    this.USER = auth.user
    this.PASS = auth.pass
  }

  _getAuth() {
    return this.USER + ':' + this.PASS
  }

  _getBaseUrl() {
    return this.BASE_URL + '/rest/api/2'
  }

  isAuthed() {
    return false
  }

  getIssues(jql) {
    let self = this

    if (!jql) jql = 'assignee=' + this.USER + ' AND status!=done'

    return got(this._getBaseUrl() + '/search?jql=' + jql,
      {
        auth: self._getAuth(),
        json: true
      })
      .then((res) => {
        return res.body.issues
      })
  }

  assignUser(issue, user) {
    let self = this
    return got.put(issue,
      {
        auth: self._getAuth(),
        body: '{ "fields": { "assignee": { "name": "' + user + '" } } }',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }

  getAssignable(issueKey) {
    let self = this
    return got(this._getBaseUrl() + '/user/assignable/search?issueKey=' + issueKey,
      {
        auth: self._getAuth(),
        json: true
      })
      .then((res) => {
        return res.body
      })
  }

  getStatuses(projectId) {
    let self = this
    return got(this._getBaseUrl() + '/project/' + projectId + '/statuses',
      {
        auth: self._getAuth(),
        json: true
      })
      .then((res) => {
        return res.body
      })
  }

}

module.exports = Jira
