import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VentaComponent} from "./venta.component";

const routes: Routes = [
  {
    path: '',
    component: VentaComponent,
    data: {
      title: 'Medición Ventas',
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
export class VentaRoutingModule { }
