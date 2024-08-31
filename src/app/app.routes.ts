import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin/admin.guard';

export const routes: Routes = [
    {path:"admin",component:AdminComponent,canActivate:[adminGuard]},
];
