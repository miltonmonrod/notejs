import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportVentaComponent } from './reportventa.component';
import {ReportVentaRoutingModule} from './reportventa-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import { SelectModule } from 'ng-select';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../auth/token.interceptor';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ReportVentaRoutingModule,
    SharedModule,
    Ng2GoogleChartsModule,    
    SelectModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [    
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }       
    ],
  declarations: [ReportVentaComponent]
})
export class ReportVentaModule { }
