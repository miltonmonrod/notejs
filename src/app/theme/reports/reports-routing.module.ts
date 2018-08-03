import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reports',
      status: false
    },
    children: [
      {
        path: 'reportventa',
        loadChildren: './reportventa/reportventa.module#ReportVentaModule'
      },
      {
        path: 'reportposventa',
        loadChildren: './reportposventa/reportposventa.module#ReportPosVentaModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
