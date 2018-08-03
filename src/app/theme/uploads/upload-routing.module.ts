import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cargue Masivo',
      status: false
    },
    children: [
      {
        path: 'ventas',
        loadChildren: './ventas/venta.module#VentaModule'
      },
      {
        path: 'posventas',
        loadChildren: './posventas/posventa.module#PosVentaModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
