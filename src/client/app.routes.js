import IssuesComponent from './components/issues.component'
import IssueComponent from './components/issue.component'
import AuthComponent from './components/auth.component'
import SettingsComponent from './components/settings.component'

export const appRoutes = [
  { path: '/', component: IssuesComponent, as: 'IssuesComponent' },
  { path: '/issue/:issueId', component: IssueComponent, as: 'IssueComponent' },
  { path: '/auth', component: AuthComponent, as: 'AuthComponent' },
  { path: '/settings', component: SettingsComponent, as: 'SettingsComponent' }
]
