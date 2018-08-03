import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Usuarios',
      icon: 'ti-user',
      caption: 'Panel de administración de usuarios',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
