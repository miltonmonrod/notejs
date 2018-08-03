import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContratacionComponent } from './contratacion.component';
import { ContratacionRoutingModule } from './contratacion-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DxDataGridModule, DxButtonModule, DxSelectBoxModule } from 'devextreme-angular';
import { UsuariosService } from '../../services/usuario.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../auth/token.interceptor';
import { SelectModule } from 'ng-select';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { isNumber, toInteger, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NgbModule, NgbDateParserFormatter, NgbDateStruct, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
    parse(value: string): NgbDateStruct {
        if (value) {
            const dateParts = value.trim().split('.');
            if (dateParts.length === 1 && isNumber(dateParts[0])) {
                return { day: toInteger(dateParts[0]), month: null, year: null };
            } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null };
            } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
                return { day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2]) };
            }
        }
        return null;
    }

    format(date: NgbDateStruct): string {
        return date ?
            `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` :
            '';
    }
}

@Injectable()
export class NgbUTCStringAdapter extends NgbDateAdapter<string> {

    fromModel(date: string): NgbDateStruct {
        return (date && Number(date.substring(0, 2)) && Number(date.substring(3, 5) + 1) && Number(date.substring(6, 10))) ?
            {
                year: Number(date.substring(6, 10)),
                month: Number(date.substring(3, 5)),
                day: Number(date.substring(0, 2))
            } : null;
    }

    toModel(date: NgbDateStruct): string {
        return date ? String('00' + date.day).slice(-2) + '/' + String('00' + date.month).slice(-2) + '/' + date.year.toString() : null;
    }
}
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ContratacionRoutingModule,
        SharedModule,
        NgxDatatableModule,
        DxDataGridModule,
        DxButtonModule,
        DxSelectBoxModule,
        SelectModule,
        SimpleNotificationsModule.forRoot(),

    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        {
            provide: NgbDateParserFormatter,
            useClass: NgbDateCustomParserFormatter
        },
        {
            provide: NgbDateAdapter,
            useClass: NgbUTCStringAdapter
        }
    ],
    declarations: [ContratacionComponent]
})
export class ContratacionModule { }
