import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todoitem } from 'src/app/models/todoitem';
import { AuthService } from 'src/app/services/auth.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  itemForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
    status: new FormControl('', Validators.required),
    userId: new FormControl('')
  });

  id: string = "";
  item: Todoitem = {
    id: "",
    title: "",
    description: "",
    status: "",
    userId: ""
  }

  formName: string = '';
  btnName: string = '';


  ngOnInit(): void {
    
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.id);
    console.log(this.itemForm);
    if(this.id){
      this.todoService.getToDoItem(this.id).subscribe(element => this.item = element);
      this.formName = 'Update item from list';
      this.btnName = 'Update item';
    }else{
      this.formName = 'Add new item to list';
      this.btnName = 'Add item';      
    }
    
  }

  get title(){
    return this.itemForm.get('title');
  }
  get description(){
    return this.itemForm.get('description');
  }
  get status(){
    return this.itemForm.get('status');
  }

  submit(): any{
    if((this.itemForm.valid)){
      if(this.id){
        this.todoService.updateToDoItem(this.itemForm.value, this.id);
      } else{
        this.todoService.addToDoItem(this.itemForm.value);        
      }
      this.router.navigate(['todo']);      
    }    
  }

  delete(){
    this.todoService.deleteToDoItem(this.id);
    this.router.navigate(['todo']);
  }

}
