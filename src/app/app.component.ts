import { Component, Inject } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { LoggerInjectionToken } from './tokens/logger.injection-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Starting Advanced Topics';
  constructor(
    @Inject(LoggerInjectionToken)
    private loggersService: LoggerService[]) {
    loggersService.forEach(
      loggerService => loggerService.logger('cc')
    );
  }
}
