import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { AppSettings } from "./AppSettings";
@Injectable()
export class ConcesionariosService {
    public url: string;
    constructor(private http: HttpClient) { 
        this.url = AppSettings.Url;
    }
    getConcesionarios(): Observable<any> {
        return this.http.get(this.url + 'api/Concesionarios');
    }
    addConcecionarios(concesionarios: Array<any>): Observable<any>{
        let json = JSON.stringify(concesionarios);
        let params = json;
        let headers = new HttpHeaders().set('Content-Type', 'application/json',);         
        return this.http.post(this.url+'api/Concesionarios', params, {headers: headers});
    }
    
}