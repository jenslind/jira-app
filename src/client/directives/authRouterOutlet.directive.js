import { Directive, AttributeMetadata, ElementRef, DynamicComponentLoader } from 'angular2/core'
import { Router, RouterOutlet, ComponentInstruction } from 'angular2/router'
import JiraService from '../services/jira.service'

@Directive({
  selector: 'router-outlet'
})
@Reflect.metadata('parameters', [[new AttributeMetadata('name')]])
export class AuthRouterOutlet extends RouterOutlet {
  constructor (nameAttr, _elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, jira: JiraService) {
    super(_elementRef, _loader, _parentRouter, nameAttr)

    this.parentRouter = _parentRouter
    this.jira = jira
  }

  activate (instruction: ComponentInstruction) {
    if (!this.parentRouter.isRouteActive(this.parentRouter.generate(['/AuthComponent']))
      && !this.jira.isAuthed()) {
      this.parentRouter.navigateByUrl('/auth')
    }

    return super.activate(instruction)
  }
}
