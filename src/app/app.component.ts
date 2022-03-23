import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ContactsStore, ContanctsState } from './store/contacts.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ContactsStore]
})
export class AppComponent {
  
  constructor(
    public authService: AuthService,
    public router: Router,
    private store: ContanctsState
  ){}

  title = 'project';

  contacts = this.store.contacts;

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

}
