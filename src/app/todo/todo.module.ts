import { NgModule } from "@angular/core";
import { TodoComponent } from "./todo/todo.component";
import { WeekTodoComponent } from "./week-todo/week-todo.component";
import { RouterModule } from "@angular/router";
import { TodoRoutingModule } from "./todo-routing.module";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
    // Nwafer les dépendances mta3 les declarations mta3i
    imports: [
        TodoRoutingModule,
        FormsModule,
        CommonModule,
        TodoComponent,
        WeekTodoComponent
    ],
    // el 7ajet eli neprovidihom
    providers: [],
    // eli n7ab npartagih m3a eli importini
    exports: []
})
export class TodoModule {}
