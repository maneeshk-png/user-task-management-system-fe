import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TaskListComponent } from './features/tasks/task-list/task-list.component';
import { TaskFormComponent } from './features/tasks/task-form/task-form.component';

export const routes: Routes = [
{path:'login',component:LoginComponent},
{path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'task', component:TaskListComponent, canActivate: [AuthGuard] },
  { path: 'task/create', component:TaskFormComponent, canActivate: [AuthGuard] },
  {path:'task/edit/:id',component:TaskFormComponent, canActivate:[AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}