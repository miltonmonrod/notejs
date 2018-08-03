import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "./AppSettings";
import { RequestFilters } from "../models/venta.model";
@Injectable()
export class VentasService {
    public url: string;
    constructor(private http: HttpClient) { 
        this.url = AppSettings.Url;
    }
    getVentas(): Observable<any> {
        return this.http.get(this.url + 'api/MedicionVentas');
    }
    getSatisfaccionGeneralVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetGeneralVentas?'+params);
    }

    getSatisfaccionPorcentajeVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetGeneralPorcentaje?'+params);
    }
    getSatisfaccionRetornoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetSatisfaccionRetorno?'+params);
    }
    getSatisfaccionRecomendacionVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetSatisfaccionRecomendacion?'+params);
    }
    getSatisfaccionAtencionVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetSatisfaccionAtencion?'+params);
    }
    getSatisfaccionDiasVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetDiasTranscurridosVentas?'+params);
    }
    getRazonRetornoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetRazonRetorno?'+params);
    }
    getRazonSatisfechoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetRazonSatisfecho?'+params);
    }
    getRazonNeutroVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetRazonNeutral?'+params);
    }
    getRazonInsatisfechoVentas(filtros: RequestFilters): Observable<any> {
        let params ="segmento=" +filtros.segmento+'&marca='+filtros.marca+'&concesionario='+ filtros.concesionario
        +'&anio='+filtros.anio+'&mes='+filtros.mes+'&contactabilidad='+filtros.contactabilidad +'&contactos='+filtros.contactos;
        return this.http.get(this.url + 'api/GetRazonInSatisfecho?'+params);
    }
}