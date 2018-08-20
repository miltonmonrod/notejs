import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { BuscarRegistro } from "../../models/BuscarRegistro";
import { Registro } from "../../models/Registro";
import { TrReportedispcomercializacion } from "../../models/TrReportedispcomercializacion";
import { DxFileUploaderComponent } from 'devextreme-angular';
import { AppSettings } from '../../services/AppSettings';

@Component({
    selector: 'app-contratos',
    templateUrl: './repdisponibilidad.component.html',
    styleUrls: [
        './repdisponibilidad.component.scss',
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

export class RepDisponibilidadComponent implements OnInit, AfterViewInit {
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
    public Lista: Array<BuscarRegistro>;
    public registro: Registro;
    public reporte: TrReportedispcomercializacion;
    public value: any[] = [];
    public url: string;
    public msj:string;
    public msjCargue:string;
    public texto:string;
    public error: any;
    public titulo: string;
    public columnas: Array<any>;
    public date: Date;
    options: any = {
        position: ['bottom', 'right']
    };

    @ViewChild(DxFileUploaderComponent) uploader:DxFileUploaderComponent;

    constructor(private parametricasService: ContratoService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();
        this.url = AppSettings.Url_uploadSop + "upload/report";
    }

    inicializarModelo() {
        this.date = new Date();
        this.registro = {
            rs: ""
        }
        this.Lista = [];
        this.reporte = {
            idreportedispcomercializacion: -1,
            numeroexpediente: "",
            numeroregistrosanitario: null,
            fechainivigenciadisp: null,
            nombremodalidad: "",
            razonsocialtitular: "",
            nombreproducto: "",
            nombreprincipioactivo: "",
            concentracionppioactivo: "",
            codreportedisponibilidad: -1,
            motivoreportedisp: "",
            fechafinvigenciadisp: null,
            indnotificacioncorreo: "S",
            emailnotificacion: "",
            nombrearchivo: "",
            ruta: "",
            estado: "",
            fechareportedisp: null,
            idusuario: this.storageService.getCurrentSession().idusuario,
            idestablecimiento: this.storageService.getCurrentSession().idestablecimiento
        }
    }

    BuscarRS() {
        if(this.registro.rs === '' || this.registro.rs === null) {
            return;
        }
        this.parametricasService.getRegistroSanitario(this.registro.rs).subscribe(
            result => {
                this.Lista = result;
                if(this.Lista.length === 0) {
                    this.servicePNotify.info('TRAZA', 'No se encontró información del número de expediente ingresado.', '');
                    this.reporte = {
                        idreportedispcomercializacion: -1,
                        numeroexpediente: "",
                        numeroregistrosanitario: null,
                        fechainivigenciadisp: null,
                        nombremodalidad: "",
                        razonsocialtitular: "",
                        nombreproducto: "",
                        nombreprincipioactivo: "",
                        concentracionppioactivo: "",
                        codreportedisponibilidad: -1,
                        motivoreportedisp: "",
                        fechafinvigenciadisp: null,
                        indnotificacioncorreo: "S",
                        emailnotificacion: "",
                        nombrearchivo: "",
                        ruta: "",
                        estado: "",
                        fechareportedisp: null,
                        idusuario: 441,
                        idestablecimiento: 885
                    }
                }
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

    seleccionarRegistro(data) {
        this.reporte.numeroregistrosanitario = data.nroregsan;
        this.reporte.concentracionppioactivo = data.concetracion;
        this.reporte.numeroexpediente = data.nroexpediente;
        this.reporte.nombreproducto = data.nmbproducto1;
        this.reporte.razonsocialtitular = data.TITULAR;
        this.reporte.nombreprincipioactivo = data.principio_Activo;
        this.reporte.nombremodalidad = data.modcompuesta;
        this.reporte.fechainivigenciadisp = data.fchvencimiento;
    }

    showPanel() {
        this.reporte.numeroregistrosanitario = null;
        this.reporte.fechainivigenciadisp = null;
        this.reporte.codreportedisponibilidad = -1;
        this.reporte.motivoreportedisp = "";
        this.reporte.fechafinvigenciadisp = null;
        this.reporte.indnotificacioncorreo = 'S';
        this.reporte.emailnotificacion = "";
    }

    onSubmitReporte(isValid) {
        if (this.reporte.fechainivigenciadisp == null) {
            this.servicePNotify.error('TRAZA', 'Seleccione la vigencia.', '');
            return;
        }
        if (this.reporte.codreportedisponibilidad == -1) {
            this.servicePNotify.error('TRAZA', 'Seleccione el tipo de reporte.', '');
            return;
        }
        if (this.reporte.codreportedisponibilidad.toString() === "4974" && this.reporte.fechafinvigenciadisp == null) {
            this.servicePNotify.error('TRAZA', 'Seleccione la Fecha estimada del reingreso.', '');
            return;
        }
        if (isValid) {
            if (this.reporte.codreportedisponibilidad.toString() === '4974' || this.reporte.codreportedisponibilidad.toString() === '4976')
                this.reporte.estado = 'A';
            else
                this.reporte.estado = 'T';//Temportal

            this.parametricasService.addRepDisponibilidad(this.reporte).subscribe(
                result => {
                    if (result.operacionExitosa) {
                        if (this.reporte.codreportedisponibilidad.toString() === '4974' || this.reporte.codreportedisponibilidad.toString() === '4976') {
                            this.servicePNotify.html(
                                '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                                'info'
                            );
                            this.inicializarModelo();
                        }
                        else if (this.reporte.codreportedisponibilidad.toString() === '4975') {
                            this.url = AppSettings.Url_uploadSop + "upload/report?idrepdispcomer=" + result.entidad.idreportedispcomercializacion;
                            document.querySelector('#cargarDocSoporte').classList.add('md-show');
                        }
                    } else {
                        this.servicePNotify.html(
                            '<h4>Error al salvar los datos <p>' + result.mensaje + '</p></h4>',
                            'error'
                        );
                    }
                },
                error => {
                    this.error = error;
                    if (this.error.statusText === 'Unauthorized') {
                        this.storageService.logout();
                    }
                    console.log(<any>error);
                })
        }
    }

    changeTipoReporte() {
        if (this.reporte.codreportedisponibilidad.toString() === "4974") {
            this.titulo = "Motivo de fuerza mayor o caso fortuito, plenamente probados y justificados, por los cuales no puede comercializar el producto:";
        }
        else if (this.reporte.codreportedisponibilidad.toString() === "4975") {
            this.reporte.motivoreportedisp = "";
            this.titulo = "";
            this.reporte.fechafinvigenciadisp = null;
        }
        else if (this.reporte.codreportedisponibilidad.toString() === "4976") {
            this.titulo = "Justificación del reingreso:";
            this.reporte.fechafinvigenciadisp = null;
        }
    }

    closeMyModal(event) {
        ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
        this.inicializarModelo();
    }

    subidaCompleta(e) {
        if (e.request.response === 'true') {
            setTimeout(() => {
                this.servicePNotify.html(
                    '<h4>Subida de datos</h4><p>El archivo se han subido correctamente y su solicitud ha sido enviada!</p>',
                    'info'
                );
                this.inicializarModelo();
                document.querySelector('#cargarDocSoporte').classList.remove('md-show');
            }, 15);
        } else {
            setTimeout(() => { this.servicePNotify.error('Subida de datos', 'Error al cargar el archivo!') }, 25);
        };
        //reinicio el componente upload
        this.uploader.instance.reset();
    }
   
}