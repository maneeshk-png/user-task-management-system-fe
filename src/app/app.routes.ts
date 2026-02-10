import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TaskListComponent } from './features/tasks/pages/task-list/task-list.component';
import { TaskFormComponent } from './features/tasks/pages/task-form/task-form.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
{path:'login',component:LoginComponent,canActivate:[GuestGuard]},
{path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'task', component:TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task/create', component:TaskFormComponent, canActivate: [AuthGuard] },
  {path:'task/edit/:id',component:TaskFormComponent, canActivate:[AuthGuard]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}