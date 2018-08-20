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

    
}