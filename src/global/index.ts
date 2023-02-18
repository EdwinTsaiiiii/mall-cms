import { App } from 'vue'
import registerElement from './register-element'

export function globalResgister(app: App): void {
  app.use(registerElement)
}
