import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportVentaComponent} from './reportventa.component';

const routes: Routes = [
  {
    path: '',
    component:ReportVentaComponent,
    data: {
      title: 'Reporte medición Ventas',
      icon: 'ti-bar-chart-alt',
      caption: 'Reporte estadistico de la medición en Ventas',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportVentaRoutingModule { }
