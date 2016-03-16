import 'zone.js/build/lib/browser/zone-microtask'
import 'reflect-metadata'
import { Component, View, provide } from 'angular2/core'
import { RouteConfig, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy, RouterLink } from 'angular2/router'
import { AuthRouterOutlet } from './directives/authRouterOutlet.directive'
import { bootstrap } from 'angular2/platform/browser'
import { appRoutes } from './app.routes'
import JiraService from './services/jira.service'
import './scss/base/_base'
import './scss/layout/_frame'
import './scss/elements/_logo'
import './scss/components/_btn'

@Component({
  selector: 'jira-app'
})
@View({
  directives: [AuthRouterOutlet, RouterLink],
  template: require('./templates/app.template.html')
})
@RouteConfig(appRoutes)
class JiraApp {

}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    JiraService
  ])
})
