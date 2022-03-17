import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import { TodoComponent } from './components/todo/todo.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
  },
  {
      path: 'home',
      component: HomeComponent,
      ...canActivate(redirectToLogin)
  },
  {
      path: 'login',
      component: LoginComponent,
      ...canActivate(redirectToHome)
  },
  {
      path: 'signup',
      component: SignupComponent,
      ...canActivate(redirectToHome)
  },
  {
      path: 'todo',
      component: TodoComponent,
      ...canActivate(redirectToLogin)
  },
  {
      path: 'contacts',
      component: ContactsComponent,
      ...canActivate(redirectToLogin)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
