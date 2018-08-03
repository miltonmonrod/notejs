import { Component, OnInit, AfterViewInit, Injectable } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ContratoService } from '../../services/contrato.service';
import { DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { User } from '../../core/models/user.model';
import { Contratista, Contrato, EpesDisponibles } from '../../models/contratacion.model';
import { NaturalezaJuridica, TipoDocumento } from '../../models/parametricascontratos.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { IOption } from 'ng-select';
import { AuthenticationService } from '../auth/login/shared/authentication.service';
import { StorageService } from '../../core/services/storage.service';
import { NotificationsService } from 'angular2-notifications';
import { IterableChangeRecord_ } from '@angular/core/src/change_detection/differs/default_iterable_differ';

@Component({
    selector: 'app-contratos',
    templateUrl: './contratacion.component.html',
    styleUrls: [
        './contratacion.component.scss',
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

export class ContratacionComponent implements OnInit, AfterViewInit {
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
        this.getContratistas();
        this.getNj();//Cargar naturalezas juridicas
        this.getTd();//Cargar tipos de documentos
        this.getDep();//Cargar departamentos
        this.getTiposLiq();//Cargar tipos de liquidación
        this.getSupervisores();//Cargar supervisores internos y externos
    }
    //Variables varias
    public displayListContratista: boolean;
    public displayCrearContratista: boolean;
    public displayListContratos: boolean;
    public displayCrearContrato: boolean;
    public titulo: string;
    public _usuario: User;
    public error: any;
    public operacion = 'C';
    public numcont: string;
    public anho: string;
    //Listas negocio
    public contratistasLista = [];
    public contratosLista: Array<Contrato>;
    public obligacionesLista = [];
    public epesLista: Array<EpesDisponibles>;
    public epesListaAso: Array<EpesDisponibles>;
    //Listas combox
    public njLista: Array<IOption>;
    public tdLista: Array<IOption>;
    public depLista: Array<IOption>;
    public munLista: Array<IOption>;
    public munListaRL: Array<IOption>;
    public tipLiq: Array<IOption>;
    public sIntLista: Array<IOption>;
    public sExtLista: Array<IOption>;
    //Objetos
    public contratista: Contratista;
    public contrato: Contrato;
    public epes: EpesDisponibles;
    //Fin Objetos

    options: any = {
        position: ['bottom', 'right']
    };

    constructor(
        private contratoService: ContratoService,
        public authenticationService: AuthenticationService,
        public storageService: StorageService,
        private servicePNotify: NotificationsService) {
        this.inicializarModelo();
        this._usuario = new User();
        this.displayListContratista = true;
        this.displayCrearContratista = false;
        this.displayListContratos = false;
        this.displayCrearContrato = false;
        this.epesListaAso = [];
        this.contratistasLista = [];
    }
    showPanel(sw, id) {
        if (sw === 'C') {//Crear contratista
            this.displayListContratista = false;
            this.displayCrearContratista = true;
            this.displayListContratos = false;
            this.displayCrearContrato = false;
            this.inicializarModelo();
        }
        else if (sw === 'V') {//Volver al listado de contratistas
            this.displayListContratista = true;
            this.displayCrearContratista = false;
            this.displayListContratos = false;
            this.displayCrearContrato = false;
            this.inicializarModelo();
            //recargar la tabla
            this.getContratistas();
        }
        else if (sw === 'U') {//Actualizar contratista
            this.contratoService.getContratistaById(id).subscribe(
                result => {
                    this.operacion = 'U';
                    this.displayListContratista = false;
                    this.displayCrearContratista = true;
                    this.displayListContratos = false;
                    this.displayCrearContrato = false;
                    this.contratista = result;
                    this.mostrarMunicipios();
                    this.mostrarMunicipiosRL();
                },
                error => {
                    this.error = error;
                    if (error.statusText === 'Unauthorized') {
                        this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                        this.authenticationService.logout().subscribe(response => { });
                        this.storageService.logout();
                    }
                    console.log(<any>error);
                }
            );
        }
        else if (sw === 'LC') {//Ver grilla de contratos
            this.contratoService.getContratistaById(id).subscribe(
                result => {
                    this.contratista = result;
                    this.titulo = "Listado de contratos de: " + this.contratista.CCO_IDENTIFICACION + " - " + this.contratista.CCO_NOMBRE;
                    this.cargarListadoContratosByCCO_ID(this.contratista.CCO_ID);
                    this.displayListContratista = false;
                    this.displayCrearContratista = false;
                    this.displayListContratos = true;
                    this.displayCrearContrato = false;
                },
                error => {
                    this.error = error;
                    if (error.statusText === 'Unauthorized') {
                        this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                        this.authenticationService.logout().subscribe(response => { });
                        this.storageService.logout();
                    }
                    console.log(<any>error);
                }
            );
        }
        else if (sw === 'CC') {//Crear nuevo contrato
            //Limpiar campos contrato
            this.operacion = 'C';
            this.displayListContratista = false;
            this.displayCrearContratista = false;
            this.displayListContratos = false;
            this.displayCrearContrato = true;
            this.titulo = "Contrato: [Nuevo] - Contratista: " + this.contratista.CCO_IDENTIFICACION + " - " + this.contratista.CCO_NOMBRE;
            this.inicializarModeloContrato();
            this.getEpesDisponibles();
            this.getEpesAsociados();
        }
        else if (sw === 'EC') {//Editar un contrato existente
            this.contratoService.getContratoById(id).subscribe(
                result => {
                    this.contrato = result;
                    this.contrato.CTL_ID = this.contrato.CTL_ID === null ? -1 : this.contrato.CTL_ID;
                    this.contrato.ASU_ID_INTERNO = this.contrato.ASU_ID_INTERNO === null ? -1 : this.contrato.ASU_ID_INTERNO;
                    this.contrato.ASU_ID_EXTERNO = this.contrato.ASU_ID_EXTERNO === null ? -1 : this.contrato.ASU_ID_EXTERNO;
                    this.contrato.CTT_INCLUYE_IVA = this.contrato.CTT_INCLUYE_IVA === null ? "-1" : this.contrato.CTT_INCLUYE_IVA;

                    this.operacion = 'U';
                    this.displayListContratista = false;
                    this.displayCrearContratista = false;
                    this.displayListContratos = false;
                    this.displayCrearContrato = true;

                    this.numcont = this.contrato.CTT_NUMERO_CONTRATO === null ? "" : this.contrato.CTT_NUMERO_CONTRATO;
                    this.anho = this.contrato.CTT_ANO === null ? "" : this.contrato.CTT_ANO;
                    this.titulo = "Contrato: " + this.numcont + "/" + this.anho + " - Contratista: " + this.contratista.CCO_IDENTIFICACION + " - " + this.contratista.CCO_NOMBRE;
                    this.getEpesDisponibles();
                    this.getEpesAsociados();
                    //Cargar obligaciones del contrato
                    this.obligacionesLista = result.ListaObligaciones;
                },
                error => {
                    this.error = error;
                    if (error.statusText === 'Unauthorized') {
                        this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                        this.authenticationService.logout().subscribe(response => { });
                        this.storageService.logout();
                    }
                    console.log(<any>error);
                }
            );
        }
    }
    //Contratos
    getContratistas() {
        this.contratoService.getAllContratista().subscribe(
            result => {
                this.contratistasLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getNj() {
        this.contratoService.getAllNaturalezaJuridica().subscribe(
            result => {
                this.njLista = result.ListaNJ;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getTd() {
        this.contratoService.getTiposDocumento().subscribe(
            result => {
                this.tdLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getDep() {
        this.contratoService.getDepartamentos().subscribe(
            result => {
                this.depLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getTiposLiq() {
        this.contratoService.getAllTipoLiquidacion().subscribe(
            result => {
                this.tipLiq = result.ListaTL;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getSupervisores() {
        this.contratoService.getAllSupervisores().subscribe(
            result => {
                this.sIntLista = result.ListaS;
                this.sExtLista = result.ListaS;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    mostrarMunicipios() {
        this.contratoService.getMunicipiosByDepartamento(this.contratista.ZON_ID_DEP).subscribe(
            result => {
                this.munLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    mostrarMunicipiosRL() {
        this.contratoService.getMunicipiosByDepartamento(this.contratista.ZON_ID_REPRESENTANTE_DEP).subscribe(
            result => {
                this.munListaRL = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    onSubmit(isValid) {
        if (isValid) {
            if (this.operacion === 'C') {
                this.contratoService.addContratista(this.contratista).subscribe(
                    result => {
                        if (result.OperacionExitosa) {
                            this.servicePNotify.html(
                                '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                                'info'
                            );
                            this.showPanel('V', 0);
                        } else {
                            this.servicePNotify.html(
                                '<h4>Error al salvar los datos <p>' + result.Mensaje + '</p></h4>',
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
            else if (this.operacion === 'U') {
                this.contratoService.setContratista(this.contratista).subscribe(
                    result => {
                        if (result.OperacionExitosa) {
                            this.servicePNotify.html(
                                '<h4>Edición de datos</h4><p>Los datos se han editado correctamente!</p>',
                                'info'
                            );
                            this.operacion = 'C';
                            this.showPanel('V', 0);
                        } else {
                            this.servicePNotify.html(
                                '<h4>Error al salvar los datos <p>' + result.Mensaje + '</p></h4>',
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
    inicializarModelo() {
        this.contratista = {
            CCO_ID: null,
            CCO_IDENTIFICACION: "",
            TNJ_ID_NATURALEZA_JURIDICA: -1,
            CCO_NOMBRE: "",
            CCO_DIRECCION: "",
            CCO_COREO_ELECTRONICO: "",
            CCO_TELEFONO_CELULAR: "",
            CCO_PROFESION: "",
            CCO_NOMBRE_REPRESENTANTE_LEGAL: "",
            DOC_ID_REPRESENTANTE: -1,
            CCO_NUM_IDENTIFICACION_REPRESENTANTE: "",
            DOC_ID: -1,
            CCO_TELEFONO_FIJO: "",
            ZON_ID_DEP: "",
            ZON_ID: "",
            ZON_ID_REPRESENTANTE_DEP: "",
            ZON_ID_REPRESENTANTE: "",
            CCO_COD_ACTI_ECONOMICA_RUT: "",
            CCO_COD_ACTI_ECONOMICA_RIT: "",
            CCO_DIGITO_VERIFICACION: null,
            CCO_TEMPORAL: null
        };
    }
    inicializarModeloContrato() {
        this.contrato = new Contrato();
        this.contrato.CTT_ID = null;
        this.contrato.CCO_ID = this.contratista.CCO_ID;
        this.contrato.CTT_NUMERO_CONTRATO = "";
        this.contrato.CTT_FECHA_SUSCRIPCION = null;
        this.contrato.CTT_FECHA_INICIO = null;
        this.contrato.CTT_FECHA_TERMINACION = null;
        this.contrato.CTT_FECHA_TERMINACION_FINAL = null;
        this.contrato.CTT_FECHA_LIQUIDACION = null;
        this.contrato.CTT_OBJETO = "";
        this.contrato.CTL_ID = -1;//tipo de liquidación
        this.contrato.CTT_FECHA_SOLICITUD = null;
        this.contrato.CTT_DIAS_SUSPENSIONES = null;
        this.contrato.CTT_DIAS_PRORROGA = null;
        this.contrato.CTT_PLAZO = "";
        this.contrato.CTT_NUM_PROCESO_SECOP_II = "";
        this.contrato.CTT_DIAS_TOTAL_DURACION_CONTRATO = null;
        this.contrato.CTT_NUMERO_REGISTRO = null;
        this.contrato.CTT_FECHA_REGISTRO_PRESUP = null;
        this.contrato.ASU_ID_INTERNO = -1;//supervisor interno
        this.contrato.ASU_ID_EXTERNO = -1;//supervisor externo
        this.contrato.CTT_VALOR_APORTE_MINISTERIO = null;
        this.contrato.CTT_VALOR_APORTE_CONTRAPARTIDA = null;
        this.contrato.CTT_VALOR_CONTRATO = null;
        this.contrato.CTT_VALOR_ADICIONES = null;
        this.contrato.CLI_VALOR_FINAL_CONTRATO = null;
        this.contrato.CTT_VALOR_CONTRATO_MENSUAL = null;
        this.contrato.CTT_FORMA_PAGO_CONVENIOS = "";
        this.contrato.CTT_PORCENTAJE_ANTICIPO = null;
        this.contrato.CTT_INCLUYE_IVA = "-1";
        this.contrato.CTT_FORMA_PAGO = "";
        this.contrato.CTT_OBLIGACIONES = "";
        this.contrato.CLI_OBSERVACIONES = "";
    }
    cargarListadoContratosByCCO_ID(id) {
        this.contratoService.getContratosByCCO_ID(id).subscribe(
            result => {
                this.contratosLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    //Fin Contratos
    getEpesDisponibles() {
        this.contratoService.getEpesDisponibles().subscribe(
            result => {
                this.epesLista = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    getEpesAsociados() {
        this.contratoService.getEpesAsociados(this.contrato.CTT_ID === null ? -1 : this.contrato.CTT_ID).subscribe(
            result => {
                this.epesListaAso = result.Lista;
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        )
    }
    onSubmitContrato() {
        this.contratoService.setContrato(this.contrato).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    this.contrato = result;
                    this.contrato.CTT_ID = parseFloat(result.EjecucionProcesoId);
                    this.servicePNotify.html(
                        '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                        'info'
                    );
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }
    onSubmitContratoYepe(id) {
        this.contratoService.setContrato(this.contrato).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    this.contrato = result;
                    //Refrescar el titulo
                    this.numcont = this.contrato.CTT_NUMERO_CONTRATO === null ? "" : this.contrato.CTT_NUMERO_CONTRATO;
                    this.anho = this.contrato.CTT_ANO === null ? "" : this.contrato.CTT_ANO;
                    this.titulo = "Contrato: " + this.numcont + "/" + this.anho + " - Contratista: " + this.contratista.CCO_IDENTIFICACION + " - " + this.contratista.CCO_NOMBRE;
                    //Asocio el Epe
                    this.asociarEpe(id, this.contrato.CTT_ID);
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }
    asociarEpe(id, CTT_ID) {
        this.contratoService.asociarEpe(id, CTT_ID).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    this.servicePNotify.html(
                        '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                        'info'
                    );
                    this.getEpesAsociados();//Recarga la tabla de Epes asociados
                    //Cargar obligaciones
                    this.cargarObligaciones(this.contrato.CTT_ID);
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }
    onSubmitAsociarEpes(data) {
        if (this.contrato.CTT_ID === null) {//Mando a crear el contrato sino existe
            this.contrato.CTT_OBJETO = data.FAE_OBJETO;
            this.contrato.CTT_VALOR_CONTRATO = data.FAE_VALOR_CDP;
            this.contrato.FAE_ID = data.FAE_ID;
            this.onSubmitContratoYepe(data.FAE_ID);//Mando a crear el contrato
        } else {
            //Asocio el Epe
            this.asociarEpe(data.FAE_ID, this.contrato.CTT_ID);
        }
    }
    liberarEpe(id) {
        this.contratoService.liberarEpe(id).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    this.servicePNotify.warn('Eliminar', 'Epe liberado correctamente!');
                    this.getEpesAsociados();//Recarga la tabla de Epes asociados
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }
    cargarObligaciones(ctt_id){
        this.contratoService.getObligacionesByCTT_ID(ctt_id).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    this.obligacionesLista = result.Lista;
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }

    actualizarObligacion(item):void { 
        item.newData.ID_REFERENCIA = this.contrato.CTT_ID;
        item.newData.ID_LLAVE = item.key;
        this.contratoService.setObligacion(item.newData).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    //Cargar obligaciones
                    this.cargarObligaciones(this.contrato.CTT_ID);
                    this.servicePNotify.html(
                        '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                        'info'
                    );
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }

    adicionarObligacion(item):void { 
        item.data.ID_REFERENCIA = this.contrato.CTT_ID;
        this.contratoService.addObligacion (item.data).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    //Cargar obligaciones
                    this.cargarObligaciones(this.contrato.CTT_ID);
                    this.servicePNotify.html(
                        '<h4>Guardado de datos</h4><p>Los datos se han guardado correctamente!</p>',
                        'info'
                    );
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }

    eliminarObligacion(item):void { 
        this.contratoService.deleteObligacion(item.key).subscribe(
            result => {
                if (result.OperacionExitosa) {
                    //Cargar obligaciones
                    this.cargarObligaciones(this.contrato.CTT_ID);
                    this.servicePNotify.warn('Eliminar', 'Datos eliminados correctamente!');
                } else {
                    this.servicePNotify.html(
                        '<h4>Error al guardar los datos</h4><p>' + result.Mensaje + '</p>',
                        'error'
                    );
                }
            },
            error => {
                this.error = error;
                if (error.statusText === 'Unauthorized') {
                    this.servicePNotify.error('SIG', 'Se perdio la sesión, por favor loguearse de nuevo', '');
                    this.authenticationService.logout().subscribe(response => { });
                    this.storageService.logout();
                }
                console.log(<any>error);
            }
        );
    }
}