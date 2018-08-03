import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RepSolicitudesComponent } from './repsolicitudes.component';

const routes: Routes = [
  {
    path: '',
    component: RepSolicitudesComponent,
    data: {
      title: 'Reporte Solicitudes',
      icon: 'ti-user',
      caption: 'En esta opción usted prodrá consultar todas las solicitudes tramitadas ante el INVIMA, sin importar el estado.',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepSolicitudesRoutingModule { }
