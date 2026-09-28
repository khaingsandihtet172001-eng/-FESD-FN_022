import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'users', component: UserListComponent },
  { path: '**', redirectTo: 'register' }
];
