import { Component, OnInit, AfterViewInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { PaReportetipoproducto } from '../../models/PaReportetipoproducto';
import { AuthenticationService } from '../auth/login/shared/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'app-contratos',
    templateUrl: './confcampos.component.html',
    styleUrls: [
        './confcampos.component.scss',
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

export class ConfCamposComponent implements OnInit, AfterViewInit {
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
        this.getConfigCampos();
    }

    //variables
    public displayLista: boolean;
    public displayCrear: boolean;
    public error: any;
    public operacionConfCampos = 'C';
    public format: any = { add: 'Adicionar', remove: 'Remover', all: 'Todos', none: 'Ninguno', direction: 'left-to-right', draggable: true, locale: undefined }
    public disabled = false;
    public filter = false;
    public keepSorted = false;
    //Listas
    public Lista: Array<PaReportetipoproducto>;
    public reporteTP: PaReportetipoproducto;
    public class_vigencia: boolean;
    public class_estado: boolean;
    public class_codtiporeporte: boolean;
    public class_idtipoproducto: boolean;
    public ListaEstado: Array<any>;
    public ListaVigencia: Array<any>;
    public ListaTipoA: Array<any>;
    public ListaTipoProducto: Array<any>;
    public ListaCampos: Array<any>;
    public ListaCamposSel: Array<any>;
    public columnas: Array<any>;
    public key = 'idconfigcamposreporte';
    public display = 'nombrecampo';


    options: any = {
        position: ['bottom', 'right']
    };

    constructor(private parametricasService: ContratoService,
        public authenticationService: AuthenticationService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();
        this.displayLista = true;
        this.displayCrear = false;

        this.ListaVigencia = [
            { Id: null, Nombre: "-- Seleccione una vigencia --" },
            { Id: 2018, Nombre: "2018" },
        ];

        this.ListaEstado = [
            { Id: '', Nombre: "-- Seleccione el estado --" },
            { Id: 'A', Nombre: "Activo" },
            { Id: 'I', Nombre: "Inactivo" },
        ];

        this.ListaTipoA = [
            { Id: '', Nombre: "-- Seleccione el tipo de archivo --" },
            { Id: 'C', Nombre: "Cabecera" },
            { Id: 'D', Nombre: "Detalle" },
        ];

        this.ListaTipoProducto = [
            { Id: null, Nombre: "-- Seleccione el tipo producto --" },
            { Id: 1, Nombre: "Medicamentos" },
            { Id: 2, Nombre: "Dispositivos médicos y equipos biomédicos" },
            { Id: 3, Nombre: "Alimentos" },
            { Id: 4, Nombre: "Cosméticos" },
            { Id: 5, Nombre: "Producto de higiene doméstica" },
            { Id: 6, Nombre: "Reactivos de diagnóstico in-vitro" },
            { Id: 7, Nombre: "Bebidas alcoholicas" },
            { Id: 8, Nombre: "Reactivos in Vitro" },
            { Id: 9, Nombre: "Producto absorbente de higiene personal" },
        ];
    }
    getConfigCampos() {
        this.parametricasService.getAllReporteTP().subscribe(
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
    getCamposDisponibles(id) {
        this.parametricasService.getAllConfCamposActivos().subscribe(
            result => {
                this.ListaCampos = result;
                this.getCamposSeleccionados(id);
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
    getCamposSeleccionados(id) {
        this.parametricasService.findAllCamposByTipoProducto(id).subscribe(
            result => {
                this.ListaCamposSel = result;
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
    inicializarModelo() {
        this.reporteTP = {
            idreportetipoproducto: 0,
            codtiporeporte: "",
            nombretiporeporte: "",
            estado: "",
            nombreestado: "",
            fechacreacion: null,
            fechacreacionformat: "",
            usuariocreacion: "",
            fechamodificacion: null,
            fechamodificacionformat: "",
            usuariomodificacion: "",
            fechainivigencia: null,
            fechafinvigencia: null,
            vigencia: null,
            diafrecuencia: null,
            idtipoproducto: null,
            nombretipoproducto: "",
            camposSeleccionados: [],
        };
        this.operacionConfCampos = 'C';
        this.class_vigencia = false;
        this.class_estado = false;
        this.class_codtiporeporte = false;
        this.class_idtipoproducto = false;
    }
    showPanel(sw) {
        if (sw === 'C') {//Crear
            this.displayLista = false;
            this.displayCrear = true;
            this.inicializarModelo();
        }
        else if (sw === 'V') {//Volver al listado de contratistas
            this.displayLista = true;
            this.displayCrear = false;
            this.inicializarModelo();
            //recargar la tabla
            this.getConfigCampos();
        }
    }
    cargarEditCampo(id) {
        this.operacionConfCampos = 'U';
        this.parametricasService.getReporteTPById(id).subscribe(
            result => {
                this.reporteTP = result;
                this.displayLista = false;
                this.displayCrear = true;
                this.getCamposDisponibles(this.reporteTP.idreportetipoproducto);
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
    onSubmit(isValid) {
        //Validar listas
        this.class_vigencia = this.reporteTP.vigencia === null;
        this.class_estado = this.reporteTP.estado === '';
        this.class_codtiporeporte = this.reporteTP.codtiporeporte == '';
        this.class_idtipoproducto = this.reporteTP.idtipoproducto === null;
        if (isValid &&
            !this.class_vigencia &&
            !this.class_estado &&
            !this.class_codtiporeporte &&
            !this.class_idtipoproducto
        ) {
            if (this.operacionConfCampos === 'C') {
                this.reporteTP.usuariocreacion = "mmontenegror";
                this.parametricasService.addReporteTP(this.reporteTP).subscribe(
                    result => {
                        if (result.operacionExitosa) {
                            this.servicePNotify.html(
                                '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                                'info'
                            );
                            this.reporteTP = result.entidad;
                            this.operacionConfCampos = 'U';
                            this.class_vigencia = false;
                            this.class_estado = false;
                            this.class_codtiporeporte = false;
                            this.class_idtipoproducto = false;
                            //Cargar campos disponibles
                            this.getCamposDisponibles(this.reporteTP.idreportetipoproducto);
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
                            this.authenticationService.logout().subscribe(response => { });
                            this.storageService.logout();
                        }
                        console.log(<any>error);
                    })
            }
            else if (this.operacionConfCampos === 'U') {
                this.reporteTP.usuariocreacion = "mmontenegror";
                this.reporteTP.camposSeleccionados = this.ListaCamposSel;
                if (this.reporteTP.camposSeleccionados.length === 0) {
                    this.servicePNotify.html(
                        '<h4>Seleccione las columnas que componen el archivo a configurar!</h4>',
                        'error'
                    );
                }
                else {
                    this.parametricasService.updateReporteTP(this.reporteTP).subscribe(
                        result => {
                            if (result.operacionExitosa) {
                                this.servicePNotify.html(
                                    '<h4>Guardado de datos</h4><p>Los datos se han editado correctamente!</p>',
                                    'info'
                                );
                                this.showPanel('V');
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
                                this.authenticationService.logout().subscribe(response => { });
                                this.storageService.logout();
                            }
                            console.log(<any>error);
                        })
                }
            }
        }
    }
    verArchivo(){
        this.parametricasService.getCsvByTipoReporteId(this.reporteTP.idreportetipoproducto).subscribe(
            result => {
                if (result.operacionExitosa) {
                    this.columnas = [];
                    this.columnas.push(result.columnas);
                    this.exportToCsv(result.nombreArchivo, this.columnas);
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al consutruir el archivo <p>' + result.mensaje + '</p></h4>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (this.error.statusText === 'Unauthorized') {
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            })

    }
    exportToCsv(filename, rows) {
        var processRow = function (row) {
            var finalVal = '';
            for (var j = 0; j < row.length; j++) {
                var innerValue = row[j] === null ? '' : row[j].toString();
                if (row[j] instanceof Date) {
                    innerValue = row[j].toLocaleString();
                };
                var result = innerValue.replace(/"/g, '""');
                if (result.search(/("|,|\n)/g) >= 0)
                    result = '"' + result + '"';
                if (j > 0)
                    finalVal += ';';
                finalVal += result;
            }
            return finalVal + '\n';
        };

        var csvFile = '';
        for (var i = 0; i < rows.length; i++) {
            csvFile += processRow(rows[i]);
        }

        var blob = new Blob(["\ufeff", csvFile], { type: 'text/csv;charset=UTF-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
}
