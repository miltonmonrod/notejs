import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { AuthenticationService } from '../auth/login/shared/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { ReporteSolicitudesPen } from "../../models/ReporteSolicitudesPen";
import { RevisionReporte } from "../../models/RevisionReporte";
import { AppSettings } from '../../services/AppSettings';

@Component({
    selector: 'app-contratos',
    templateUrl: './repdispsolpen.component.html',
    styleUrls: [
        './repdispsolpen.component.scss',
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

export class RepDispSolPenComponent implements OnInit, AfterViewInit {
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
    public Lista: Array<ReporteSolicitudesPen>;
    public Reporte: ReporteSolicitudesPen;
    public RevisionReporte: RevisionReporte;
    public displayConcepto: boolean;
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
        this.getReporteSolPen();
        this.displayConcepto = false;
        this.RevisionReporte = {
            idrevisiondispcomercializacion: -1,
            idreportedispcomercializacion: -1,
            idfuncionario: 1,
            conceptorevision: "",
            indaprobacion: ""
        }
    }

    getReporteSolPen() {
        this.parametricasService.getReporteSolicitudesPendientes().subscribe(
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

    cargarEditCampo(data) {
        this.displayConcepto = true;
        this.Reporte = data;
    }

    showPanel() {
        this.displayConcepto = false;
    }

    Aceptar() {
        this.savalRevision('A');
    }

    Denegar(){
        this.savalRevision('D');
    }

    savalRevision(estado) {
        debugger;
        this.RevisionReporte.idreportedispcomercializacion = this.Reporte.IDREPORTEDISPCOMERCIALIZACION;
        this.RevisionReporte.indaprobacion = estado;
        this.parametricasService.addRevisionRepDis(this.RevisionReporte).subscribe(
            result => {
                if (result.operacionExitosa) {
                    this.servicePNotify.html(
                        '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                        'info'
                    );
                    this.getReporteSolPen();
                    this.displayConcepto = false;
                    this.RevisionReporte.conceptorevision = "";
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al salvar los datos <p>' + result.mensaje + '</p></h4>',
                        'error'
                    );
                }
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

    descargarSoporte(){
        window.open(AppSettings.Url_uploadSop + 'download/report?id=' + this.Reporte.IDREPORTEDISPCOMERCIALIZACION, '_blank');
    }
}