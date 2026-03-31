import { Component, inject, Inject } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { LoggerInjectionToken } from './tokens/logger.injection-token';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  ngxService =  inject(NgxUiLoaderService);
  router = inject(Router);
  constructor(
    @Inject(LoggerInjectionToken)
    private loggersService: LoggerService[]) {
    loggersService.forEach(
      loggerService => loggerService.logger('cc')
    );
    // this.router.events.subscribe({
    //   next: (event) => {
    //     if (event instanceof NavigationStart) {
    //       this.ngxService.start();
    //     } else if (
    //       event instanceof NavigationEnd ||
    //       event instanceof NavigationError ||
    //       event instanceof NavigationCancel
    //     ) {
    //       this.ngxService.stop();
    //     }
    //   }
    // })

  }
}
