import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin/admin.guard';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { PagesComponent } from './pages/pages.component';
import { DatatableComponent } from './datatable/datatable.component';

export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
    {path:"pages",component:PagesComponent,canActivate:[adminGuard]},
    {path:"login",component:LoginComponent},
    {path:"logout",component:LogoutComponent},
    {path:"home",component:HomeComponent},
    {path:"p/:id",component:PageComponent},
    {path:"page/:id",component:PageComponent},
    {path:"datatable",component:DatatableComponent}
];
