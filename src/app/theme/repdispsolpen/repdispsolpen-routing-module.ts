import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RepDispSolPenComponent } from './repdispsolpen.component';

const routes: Routes = [
  {
    path: '',
    component: RepDispSolPenComponent,
    data: {
      title: 'Solicitudes pendientes',
      icon: 'ti-user',
      caption: 'En esta opción usted prodrá consultar las solicitudes pendientes de evaluación.',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepDispSolPenRoutingModule { }
