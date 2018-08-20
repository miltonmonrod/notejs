import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { TrReporte } from "../../models/TrReporte";

@Component({
    selector: 'app-contratos',
    templateUrl: './historial.component.html',
    styleUrls: [
        './historial.component.scss',
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

export class HistorialXproductoComponent implements OnInit, AfterViewInit {
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

    public error: any;
    public columnas: Array<any>;
    options: any = {
        position: ['bottom', 'right']
    };
    public ListaReporte: Array<any>;
    public reporte: TrReporte;
    public ListaVigencia: Array<any>;
    public class_aniovigencia: boolean;

    constructor(private parametricasService: ContratoService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();

        this.ListaVigencia = [
            { Id: null, Nombre: "-- Seleccione una vigencia --" },
            { Id: 2018, Nombre: "2018" },
        ];
    }

    inicializarModelo() {
        this.reporte = {
            idreporte: 0,
            idtipoproducto: 1,
            aniovigencia: null,
            mesvigencia: null,
            idsucursal: this.storageService.getCurrentSession().idsucursal,
            idusuario: this.storageService.getCurrentSession().idusuario
        };
        this.class_aniovigencia = false;
    }

    onSubmit(isValid) {
        this.class_aniovigencia = this.reporte.aniovigencia === null;
        if (isValid &&
            !this.class_aniovigencia
        ) {
            this.parametricasService.getReporteProducto(this.reporte.aniovigencia, this.reporte.idsucursal).subscribe(
                result => {
                    this.ListaReporte = result;
                },
                error => {
                    this.error = error;
                    if (error.statusText === 'Unauthorized') {
                        this.servicePNotify.error('TRAZA', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                        this.storageService.logout();
                    }
                    console.log(<any>error);
                }
            )
        }
    }
}