import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin/admin.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
    {path:"pages",component:AdminComponent,canActivate:[adminGuard]},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent},
    {path:"home",component:HomeComponent},
    {path:"p/:id",component:PageComponent}
];
