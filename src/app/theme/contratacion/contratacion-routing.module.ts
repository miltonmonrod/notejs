import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContratacionComponent} from './contratacion.component';

const routes: Routes = [
  {
    path: '',
    component: ContratacionComponent,
    data: {
      title: 'Contratos',
      icon: 'ti-user',
      caption: 'Gestión de contratos',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratacionRoutingModule { }
