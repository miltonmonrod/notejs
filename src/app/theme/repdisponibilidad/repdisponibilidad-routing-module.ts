import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RepDisponibilidadComponent } from './repdisponibilidad.component';

const routes: Routes = [
  {
    path: '',
    component: RepDisponibilidadComponent,
    data: {
      title: 'Reporte disponibilidad y control de los medicamentos',
      icon: 'ti-user',
      caption: 'Por medio de este formato se presenta la información correspondiente a la comercialización de un medicamento con registro sanitario vigente, de acuerdo a los artículos 8 y 9 del Decreto 843 de 2016',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepDisponibilidadRoutingModule { }
