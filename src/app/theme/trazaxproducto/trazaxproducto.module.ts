import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrazaXproductoComponent } from './trazaxproducto.component';
import { TrazaXproductoRoutingModule } from './trazaxproducto-routing-module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DxDataGridModule, DxButtonModule, DxListModule, DxSelectBoxModule, DxFileUploaderModule } from 'devextreme-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { SimpleNotificationsModule } from 'angular2-notifications';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TrazaXproductoRoutingModule,
        SharedModule,
        NgxDatatableModule,
        DxDataGridModule,
        DxButtonModule,
        DxListModule,
        DxSelectBoxModule,
        DxFileUploaderModule,
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
        TrazaXproductoComponent
    ]
})
export class TrazaXproductoModule { }
