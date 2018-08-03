import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';
import { AuthorizatedGuard } from './core/guards/authorizated.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent, 
    // canActivate: [ AuthorizatedGuard ],   
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },     
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/dashboard.module#DashboardModule'
      },           
      {
        path: 'reports',
        loadChildren: './theme/reports/reports.module#ReportsModule'
      },
      {
        path: 'users',
        loadChildren: './theme/users/users.module#UsersModule'
      },
      {
        path: 'crearcampos',
        loadChildren: './theme/crearcampos/parametricas.module#ParametricasModule'
      },
      {
        path: 'confcampos',
        loadChildren: './theme/confcampos/confcampos.module#ConfCamposModule'
      },
      {
        path: 'trazaxproducto',
        loadChildren: './theme/trazaxproducto/trazaxproducto.module#TrazaXproductoModule'
      }, 
      {
        path: 'historial',
        loadChildren: './theme/historial/historial.module#HistorialXproductoModule'
      },
      {
        path: 'repdisponibilidad',
        loadChildren: './theme/repdisponibilidad/repdisponibilidad.module#RepDisponibilidadModule'
      },
      {
        path: 'repdispsolpen',
        loadChildren: './theme/repdispsolpen/repdispsolpen.module#RepDispSolPenModule'
      },
      {
        path: 'repsolicitudes',
        loadChildren: './theme/repsolicitudes/repsolicitudes.module#RepSolicitudesModule'
      },    
    ]   
  },
  {
    path: '',
    component: AuthComponent,
    children: [     
      {
        path: 'auth',
        loadChildren: './theme/auth/auth.module#AuthModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
