import 'reflect-metadata'
import { Component, View, provide } from 'angular2/core'
import { RouteConfig, RouterOutlet, ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router'
import { bootstrap } from 'angular2/platform/browser'

@Component({
  selector: 'jira-app'
})
@View({
  directives: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
class JiraApp {

}

document.addEventListener('DOMContentLoaded', () => {
  bootstrap(JiraApp, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy })
  ])
})
