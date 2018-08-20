import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing-module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SimpleNotificationsModule } from 'angular2-notifications';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        InicioRoutingModule,
        SharedModule,
        NgxDatatableModule,
        SimpleNotificationsModule.forRoot()
    ],
    declarations: [
        InicioComponent
    ]
})
export class InicioModule { }
