import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { AuthenticationService } from '../auth/login/shared/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { ReporteSolicitudes } from "../../models/ReporteSolicitudes";

@Component({
    selector: 'app-contratos',
    templateUrl: './repsolicitudes.component.html',
    styleUrls: [
        './repsolicitudes.component.scss',
        '../../../assets/icon/icofont/css/icofont.scss'
    ],
    animations: [
        trigger('fadeInOutTranslate', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('400ms ease-in-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'translate(0)' }),
                animate('400ms ease-in-out', style({ opacity: 0 }))
            ])
        ])
    ],
    providers: [ContratoService]
})

export class RepSolicitudesComponent implements OnInit, AfterViewInit {
    ngAfterViewInit(): void {
        this.options = {
            position: ['bottom', 'right'],
            maxStack: 8,
            timeOut: 5000,
            showProgressBar: true,
            pauseOnHover: true,
            lastOnBottom: true,
            clickToClose: true,
            preventDuplicates: false,
            preventLastDuplicates: false,
            theClass: 'bg-c-pink no-icon',
            rtl: false,
            animate: 'rotate'
        };
    }
    ngOnInit(): void {

    }
    //Listas
    public Lista: Array<ReporteSolicitudes>;
    public error: any;
    public columnas: Array<any>;
    options: any = {
        position: ['bottom', 'right']
    };
    
    constructor(private parametricasService: ContratoService,
        public authenticationService: AuthenticationService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();

    }

    inicializarModelo() {
        this.getReporteAll();
    }

    getReporteAll() {
        this.parametricasService.getReporteSolicitudesAll().subscribe(
            result => {
                this.Lista = result;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('TRAZA', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }

}