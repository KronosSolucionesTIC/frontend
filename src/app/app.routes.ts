import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './clients/component/client.component';
import { MenuComponent } from './menu/component/menu.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent} ,
    { path: 'clients', component: ClientComponent },
    { path: 'menu', component: MenuComponent}, 
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
