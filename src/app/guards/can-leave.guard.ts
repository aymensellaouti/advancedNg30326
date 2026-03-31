import { CanDeactivateFn } from '@angular/router';
import { ICanLeave } from './can-leave.interface';

export const canLeaveGuard: CanDeactivateFn<ICanLeave> = (component, currentRoute, currentState, nextState) => {
  if (!component.canLeave()) {
   return confirm(component.canLeaveMessage());
  }
  return true;
};
