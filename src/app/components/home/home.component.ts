import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  

  constructor(
    private authService: AuthService
  ) { }

  firstCardTitle!: string;
  firstCardDesc!: string;
  firstCardIcon!: string;
  secondCardTitle!: string;
  secondCardDesc!: string;
  secondCardIcon!: string;

  user = this.authService.currentUser;

  ngOnInit(): void {    
    this.firstCardTitle = 'To Do List';
    this.firstCardDesc = 'Description';
    this.firstCardIcon = 'assignment';
    this.secondCardTitle = 'Contacts Book';
    this.secondCardDesc = 'Description';
    this.secondCardIcon = 'contacts';
  }

}
