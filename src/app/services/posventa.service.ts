import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "./AppSettings";
import { RequestFilters } from "../models/posventa.model";
@Injectable()
export class PosVentasService {
    public url: string;
    constructor(private http: HttpClient) { 
        this.url = AppSettings.Url;
    }
    getVentas(): Observable<any> {
        return this.http.get(this.url + 'api/MedicionPosVentas');
    }
    getSatisfaccionGeneralVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetGeneralPosVentas?'+params);
    }

    getSatisfaccionPorcentajeVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetGeneralPorcentajepos?'+params);
    }
    getSatisfaccionRetornoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetSatisfaccionRetornopos?'+params);
    }
    getSatisfaccionRecomendacionVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetSatisfaccionRecomendacionpos?'+params);
    }
    getSatisfaccionAtencionVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetSatisfaccionAtencionpos?'+params);
    }
    getSatisfaccionDiasVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetDiasTranscurridosPosVentas?'+params);
    }
    getRazonRetornoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetRazonRetornopos?'+params);
    }
    getRazonSatisfechoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetRazonSatisfechopos?'+params);
    }
    getRazonNeutroVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetRazonNeutralpos?'+params);
    }
    getRazonInsatisfechoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetRazonInSatisfechopos?'+params);
    }
    getMotivoVisitas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&motivo='+filtros.motivo;
        return this.http.get(this.url + 'api/GetMotivosVisitas?'+params);
    }
}