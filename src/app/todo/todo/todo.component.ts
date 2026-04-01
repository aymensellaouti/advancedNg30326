import { Component, OnDestroy } from '@angular/core';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
})
export class TodoComponent implements OnDestroy {
  todos: Todo[] = [];
  todo = new Todo();
  timer$ = timer(0,1000);
  subscription: Subscription;
  constructor(private todoService: TodoService) {
    this.todos = this.todoService.getTodos();
    this.subscription = this.timer$.subscribe({
      next: value => console.log(value)
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addTodo() {
    this.todoService.addTodo(this.todo);
    this.todo = new Todo();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
