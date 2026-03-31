import { CanDeactivateFn } from '@angular/router';

export const canLeaveGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
