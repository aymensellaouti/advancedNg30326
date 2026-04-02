import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { importProvidersFrom, isDevMode } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter, withPreloading } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";
import { ToastrModule } from "ngx-toastr";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { CONSTANTES } from "src/config/const.config";
import { routes } from "./app-routing.module";
import { AuthInterceptorProvider } from "./auth/interceptors/auth.interceptor";
import { CvService } from "./cv/services/cv.service";
import { FakeCvService } from "./cv/services/fake-cv.service";
import { CustomPreloadingStrategy } from "./preloading stratgies/custom.preloading-startegy";
import { LoggerService } from "./services/logger.service";
import { Logger2Service } from "./services/logger2.service";
import { Logger3Service } from "./services/logger3.service";
import { LoggerInjectionToken } from "./tokens/logger.injection-token";
import { UUID_TOKEN } from "./tokens/uuid.inject-token";
import { v4 as uuidV4 } from 'uuid';
export const appConfig = {
  providers: [
    importProvidersFrom(
      BrowserModule,
      FormsModule, // required animations module
      ToastrModule.forRoot(), // ToastrModule added

      ReactiveFormsModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
      NgxUiLoaderModule,
    ),
    AuthInterceptorProvider,
    {
      // esm el Token
      provide: CvService,
      // 1 '1'
      useClass: CONSTANTES.env === 'dev' ? FakeCvService : CvService,
    },
    {
      provide: LoggerInjectionToken,
      useClass: Logger2Service,
      multi: true,
    },
    {
      provide: LoggerInjectionToken,
      useClass: LoggerService,
      multi: true,
    },
    {
      provide: LoggerInjectionToken,
      useClass: Logger3Service,
      multi: true,
    },
    {
      // esm el plat
      provide: UUID_TOKEN,
      // le plat
      useValue: uuidV4,
    },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes, withPreloading(CustomPreloadingStrategy)),
  ],
};
