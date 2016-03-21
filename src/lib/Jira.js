'use strict'

const got = require('got')

class Jira {

  constructor (auth) {
    if (auth) {
      this.BASE_URL = auth.baseUrl
      this.USER = auth.user
      this.PASS = auth.pass
    }
  }

  _getAuth () {
    return this.USER + ':' + this.PASS
  }

  _getBaseUrl () {
    return this.BASE_URL + '/rest/api/2'
  }

  getIssues (jql) {
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

  getIssue (id) {
    let self = this
    return got(this._getBaseUrl() + '/issue/' + id + '?expand=renderedFields,transitions', {
      auth: self._getAuth(),
      json: true
    })
    .then(res => {
      return res.body
    })
  }

  assignUser (issue, user) {
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

  getAssignable (issueKey) {
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

  getTransitions (issueId) {
    let self = this
    return got(this._getBaseUrl() + '/issue/' + issueId + '/transitions',
      {
        auth: self._getAuth(),
        json: true
      })
      .then((res) => {
        return res.body
      })
  }

  transition (issueId, transitionId) {
    let self = this
    return got.post(this._getBaseUrl() + '/issue/' + issueId + '/transitions', {
      auth: self._getAuth(),
      body: '{ "transition": { "id":' + transitionId + '} }',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

}

module.exports = Jira
