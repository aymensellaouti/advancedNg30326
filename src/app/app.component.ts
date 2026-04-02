import { Component, inject, Inject } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { LoggerInjectionToken } from './tokens/logger.injection-token';
import { NgxUiLoaderService, NgxUiLoaderModule } from 'ngx-ui-loader';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CounterComponent } from "./signals/counter/counter.component";
import { FirstSignalComponent } from "./signals/first-signal/first-signal.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [NavbarComponent, NgxUiLoaderModule, RouterOutlet, CounterComponent, FirstSignalComponent]
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
