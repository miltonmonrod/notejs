import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistorialXproductoComponent } from './historial.component';
import { HistorialXproductoRoutingModule } from './historial-routing-module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DxDataGridModule, DxButtonModule, DxListModule, DxSelectBoxModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HistorialXproductoRoutingModule,
        SharedModule,
        NgxDatatableModule,
        DxDataGridModule,
        DxButtonModule,
        DxListModule,
        DxSelectBoxModule,
        SimpleNotificationsModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    declarations: [
        HistorialXproductoComponent
    ]
})
export class HistorialXproductoModule { }
