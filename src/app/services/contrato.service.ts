import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
//Personalizadas
import { NaturalezaJuridica, TipoLiquidacion, Supervisores, ModalidadSeleccion } from "../models/parametricascontratos.model";
import { PaConfigcamposreporte } from "../models/PaConfigcamposreporte";
import { PaReportetipoproducto } from '../models/PaReportetipoproducto';
import { RevisionReporte } from '../models/RevisionReporte';
import { AppSettings } from "./AppSettings";
import { TrReportedispcomercializacion } from "../models/TrReportedispcomercializacion";
@Injectable()
export class ContratoService {
    public url: string;
    constructor(private http: HttpClient) {
        this.url = AppSettings.Url;
        
    }

    getAllConfCampos(): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'campos', {headers: headers});
    }

    getAllConfCamposActivos(): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'camposActivos', {headers: headers});
    }

    findAllCamposByTipoProducto(id): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'findAllCamposByTipoProducto/' + id, {headers: headers});
    }

    getConfCampoById(id): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'campos/' + id, {headers: headers});
    }

    addConfCampos(cc: PaConfigcamposreporte): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(this.url + 'add', cc, { headers: headers });
    }

    addRepDisponibilidad(cc: TrReportedispcomercializacion): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(AppSettings.Url_repDispSave + 'addReporteDisConMed', cc, { headers: headers });
    }

    addRevisionRepDis(cc: RevisionReporte): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(AppSettings.Url_repDispSave + 'addRevisionDisConMed', cc, { headers: headers });
    }

    updateConfCampos(cc: PaConfigcamposreporte): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(this.url + 'update', cc, { headers: headers });
    }

    getAllReporteTP(): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'reportesByTipoProducto', {headers: headers});
    }

    getReporteSolicitudesAll(): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(AppSettings.Url_repAll_disp + 'repdisponibilidad/getReportes', {headers: headers});
    }

    getReporteSolicitudesPendientes(): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(AppSettings.Url_repSolPen_disp + 'repsolpen/getSolPendientes', {headers: headers});
    }

    getRegistroSanitario(rs): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(AppSettings.Url_repDispRS + 'reportedispo/getRegistroInvima?RI='+rs, {headers: headers});
    }

    getReporteTPById(id): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.get(this.url + 'reportesByTipoProducto/' + id, {headers: headers});
    }

    addReporteTP(cc: PaReportetipoproducto): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(this.url + 'addReporteTipoProducto', cc, { headers: headers });
    }

    updateReporteTP(cc: PaReportetipoproducto): Observable<any> {
        let headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*');
        return this.http.post(this.url + 'updateReporteTipoProducto', cc, { headers: headers });
    }
    
    getCsvByTipoReporteId(id): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*')
        return this.http.get(this.url + 'crearCSVByTipoproducto/' + id, {headers: headers});
    }

    getReporteProducto(vigencia, sucursal): Observable<any> {
        let headers = new HttpHeaders()
        .set('Access-Control-Allow-Origin', '*')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*')
        return this.http.get(AppSettings.Url_rep_producto + 'traza/reportexproducto/getReportes?ANIOVIGENCIA=' + vigencia + '&IDSUCURSAL=' + sucursal, {headers: headers});
    }

    getTiposDocumento(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Parametricas/getTiposDocumento');
    }
    getAllNaturalezaJuridica(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Parametricas/getNaturalezaJuridica');
    }
    addNaturalezaJuridica(nj: NaturalezaJuridica): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/addNaturalezaJuridica', nj, { headers: headers });
    }
    setNaturalezaJuridica(nj: NaturalezaJuridica): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/setNaturalezaJuridica', nj, { headers: headers });
    }
    deleteNaturalezaJuridica(nj: NaturalezaJuridica): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/deleteNaturalezaJuridica', nj, { headers: headers });
    }
    getAllTipoLiquidacion(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Parametricas/getTipoLiquidacion');
    }
    addTipoLiquidacion(tl: TipoLiquidacion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/addTipoLiquidacion', tl, { headers: headers });
    }
    setTipoLiquidacion(tl: TipoLiquidacion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/setTipoLiquidacion', tl, { headers: headers });
    }
    deleteTipoLiquidacion(tl: TipoLiquidacion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/deleteTipoLiquidacion', tl, { headers: headers });
    }
    getAllSupervisores(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Parametricas/getSupervisores');
    }
    addSupervisores(su: Supervisores): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/addSupervisores', su, { headers: headers });
    }
    setSupervisores(su: Supervisores): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/setSupervisores', su, { headers: headers });
    }
    deleteSupervisores(su: Supervisores): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/deleteSupervisores', su, { headers: headers });
    }
    getAllModalidadSeleccion(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Parametricas/getModalidadSeleccion');
    }
    addModalidadSeleccion(ms: ModalidadSeleccion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/addModalidadSeleccion', ms, { headers: headers });
    }
    setModalidadSeleccion(ms: ModalidadSeleccion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/setModalidadSeleccion', ms, { headers: headers });
    }
    deleteModalidadSeleccion(ms: ModalidadSeleccion): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Parametricas/deleteModalidadSeleccion', ms, { headers: headers });
    }
    getAllContratista(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getAllContratistas');
    }
    getDepartamentos(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Basicos/getDepartamentos');
    }
    getMunicipiosByDepartamento(id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Basicos/getMunicipiosByDepartamento?id=' + id);
    }
    addContratista(c): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Contratistas/addContratista', c, { headers: headers });
    }
    setContratista(c): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Contratistas/setContratista', c, { headers: headers });
    }
    getContratistaById(id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getContratistaById?CCO_ID=' + id);
    }
    getContratosByCCO_ID(id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getAllContratosByContratista?CCO_ID=' + id);
    }
    getContratoById(id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getContratoByID?CTT_ID=' + id);
    }
    getEpesDisponibles(): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getEpesDisponibles');
    }
    getEpesAsociados(id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getEpesAsociado?CTT_ID=' + id);
    }
    setContrato(c): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Contratistas/setContrato', c, { headers: headers });
    }
    asociarEpe(fae_id, ctt_id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'text/plain');
        return this.http.post(this.url + 'ApiRest/Contratistas/addEpeContrato?FAE_ID=' + fae_id + '&CTT_ID=' + ctt_id, headers);
    }
    liberarEpe(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'text/plain');
        return this.http.post(this.url + 'ApiRest/Contratistas/liberarEpeContrato?CFE_ID=' + id, headers);
    }
    getObligacionesByCTT_ID(ctt_id): Observable<any> {
        return this.http.get(this.url + 'ApiRest/Contratistas/getObligacionesByCTT_ID?CTT_ID=' + ctt_id);
    }
    deleteObligacion(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'text/plain');
        return this.http.post(this.url + 'ApiRest/Contratistas/deleteObligacion?id=' + id, headers);
    }
    addObligacion(c): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Contratistas/addObligacion', c, { headers: headers });
    }
    setObligacion(c): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'ApiRest/Contratistas/setObligacion', c, { headers: headers });
    }
}