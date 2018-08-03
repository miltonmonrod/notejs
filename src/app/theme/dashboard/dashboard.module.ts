import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    ChartModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class DashboardModule { }
