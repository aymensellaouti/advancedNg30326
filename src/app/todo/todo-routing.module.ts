import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";



export const TODO_ROUTES = [{ path: '', loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent) }];
@NgModule({
  imports: [RouterModule.forChild(TODO_ROUTES)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
