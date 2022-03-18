import { Component, OnInit } from '@angular/core';
import { Todoitem } from 'src/app/models/todoitem';
import { TodoService } from 'src/app/services/todo.service';

// const ELEMENT_DATA: Todoitem[] = [
//   {id: "1", title: 'Task 1', description: "Task description 1", status: 'Pending'},
//   {id: "2", title: 'Task 2', description: "Task description 2", status: 'Closed'},
//   {id: "3", title: 'Task 3', description: "Task description 3", status: 'Closed'},
//   {id: "4", title: 'Task 4', description: "Task description 4", status: 'Open'},
//   {id: "5", title: 'Task 5', description: "Task description 5", status: 'Open'}
// ];

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  toDoTasks: Todoitem[] = [];

  constructor(
    private todoService: TodoService
  ) { }

  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'edit'];
  //dataSource = ELEMENT_DATA;

  ngOnInit(): void {
      this.todoService.getToDoItems().subscribe((el: Todoitem[]) => {
          this.toDoTasks = el;
      })
  }
  

}
