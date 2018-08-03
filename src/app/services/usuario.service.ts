import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Usuario } from "../models/usuario.model";
import { AppSettings } from "./AppSettings";
@Injectable()
export class UsuariosService {
    public url: string;
    constructor(private http: HttpClient) {
        this.url = AppSettings.Url;
    }
    getUsuarios(): Observable<any> {
        return this.http.get(this.url + 'api/Usuarios');
    }
    getSegmentos(): Observable<any> {
        return this.http.get(this.url + 'api/getsegmentos');
    }
    getMarca(): Observable<any> {
        return this.http.get(this.url + 'api/getvehiculos');
    }
    getAnio(): Observable<any> {
        return this.http.get(this.url + 'api/getanios');
    }
    getMes(): Observable<any> {
        return this.http.get(this.url + 'api/getmes');
    }
    getContactabilidad(): Observable<any> {
        return this.http.get(this.url + 'api/getparametroscontabilidad');
    }
    getContactosValidos(): Observable<any> {
        return this.http.get(this.url + 'api/getparametroscontactos');
    }
    getConcesionarios(): Observable<any> {
        return this.http.get(this.url + 'api/getconcesionarios');
    }
    getConcesionariosUser(id: number): Observable<any> {
        return this.http.get(this.url + 'api/getconcesionariosUser?id=' + id);
    }
    /* PosVenta */
    getConcesionariosPos(): Observable<any> {
        return this.http.get(this.url + 'api/getconcesionariospos');
    }
    getSegmentosPos(): Observable<any> {
        return this.http.get(this.url + 'api/getsegmentospos');
    }
    getMarcaPos(): Observable<any> {
        return this.http.get(this.url + 'api/getvehiculospos');
    }
    getAnioPos(): Observable<any> {
        return this.http.get(this.url + 'api/getaniospos');
    }
    getMesPos(): Observable<any> {
        return this.http.get(this.url + 'api/getmespos');
    }
    getMotivosPos():Observable<any>{
        return this.http.get(this.url + 'api/getmotivopos');
    }
    deleteUser(id: number): Observable<any> {
        return this.http.delete(this.url + 'api/Usuarios/' + id);
    }
    addUsuario(usuario: Usuario): Observable<any> {
        let json = JSON.stringify(usuario);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json', );
        return this.http.post(this.url + 'api/Usuarios', params, { headers: headers });
    }
}