import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todoitem } from '../models/todoitem';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor( 
    private firestoreService: AngularFirestore,
    private toast: HotToastService,
    public auth: AuthService
  ){}

  email!: string;

  getToDoItems(): Observable<Todoitem[]>{  
     return this.firestoreService.collection<Todoitem>("todolist").snapshotChanges()
     .pipe(
      map((changes: any) => changes.map((c: any) => ({
        id: c.payload.doc.id,
        ... c.payload.doc.data()
      }))
      )
    )
  }

  getToDoItem(id: string): Observable<Todoitem>{ 
    return this.firestoreService.doc<Todoitem>(`todolist/${id}`).snapshotChanges()
    .pipe(
      map((action: any) => {
        if(action.payload.exist === false){
          return new Object as Todoitem
        }else{
          const data = action.payload.data() as Todoitem;
          data.id = action.payload.id;
          return data;
        }
      })
    );
  }

  addToDoItem(item: Todoitem): void{
    this.firestoreService.collection<Todoitem>("todolist").add(item)
    .then(() => {
      this.toast.success(
        'Item added successfully'
      );
    })
    .catch(() => {
      this.toast.error(
        'An error occured during the proccess. Please try again!'
      );
    });
  }

  updateToDoItem(item: Todoitem, id: string): void{
    this.firestoreService.collection<Todoitem>("todolist").doc(id).update(item)
    .then(() => {
      this.toast.success(
        'Item updated successfully'
      );
    })
    .catch(() => {
      this.toast.error(
        'An error occured during the proccess. Please try again!'
      );
    });
  }

  deleteToDoItem(id: string): void{
    this.firestoreService.collection<Todoitem>("todolist").doc(id).delete()
    .then(() => {
      this.toast.success(
        'Item deleted successfully'
      );
    })
    .catch((error) => {
      this.toast.error(
        error
      );
    });
    //this.firestoreService.doc<Todoitem>(`todolist/${id}`).delete();
  }

}
