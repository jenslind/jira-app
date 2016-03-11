import IssuesComponent from './components/issues.component'
import IssueComponent from './components/issue.component'

export const appRoutes = [
  { path: '/', component: IssuesComponent, as: 'IssuesComponent' },
  { path: '/issue/:issueId', component: IssueComponent, as: 'IssueComponent' }
]
