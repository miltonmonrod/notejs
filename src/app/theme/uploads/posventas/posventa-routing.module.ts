import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PosVentaComponent} from './posventa.component';

const routes: Routes = [
  {
    path: '',
    component: PosVentaComponent,
    data: {
      title: 'Medición PosVentas',
      icon: 'ti-file',
      caption: 'En este modulo usted podrá subir archivos de medición de PosVentas',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PosVentaRoutingModule { }
