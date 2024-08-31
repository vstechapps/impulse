import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin/admin.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent},
];
