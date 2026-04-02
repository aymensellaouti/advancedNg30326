import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TodoComponent } from "./todo/todo.component";


export const TODO_ROUTES = [{ path: 'todo', component: TodoComponent }];
@NgModule({
  imports: [RouterModule.forChild(TODO_ROUTES)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
