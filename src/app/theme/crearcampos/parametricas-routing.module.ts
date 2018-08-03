import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ParametricasComponent} from './parametricas.component';

const routes: Routes = [
  {
    path: '',
    component: ParametricasComponent,
    data: {
      title: 'Parametricas',
      icon: 'ti-user',
      caption: 'Administración de parametricas del sistema TRAZA',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametricasRoutingModule { }
