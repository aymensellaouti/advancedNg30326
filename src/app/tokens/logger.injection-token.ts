import { InjectionToken } from "@angular/core";
import { LoggerService } from "../services/logger.service";

export const LoggerInjectionToken = new InjectionToken<LoggerService[]>('LoggerInjectionToken');
