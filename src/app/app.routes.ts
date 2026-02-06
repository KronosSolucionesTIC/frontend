import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/component/menu.component';
import { ClientListComponent } from './clients/client-list.component/client-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent} ,
    { path: 'clients', component: ClientListComponent },
    { path: 'menu', component: MenuComponent}, 
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
