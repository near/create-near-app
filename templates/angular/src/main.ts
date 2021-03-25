import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AppModule } from './app/app.module'
import { environment } from './environments/environment'
import { initContract } from './utils'

if (environment.production) {
  enableProdMode()
}

window.nearInitPromise = initContract()
  .then(() => {
    platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err))
  })
