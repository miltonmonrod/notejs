import { Injectable } from "@angular/core";
import { Session } from "../models/session.model";

@Injectable()
export class StorageService {

    private localStorageService;
    private currentSession: Session = null;
    constructor() {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: Session): void {
        this.currentSession = session;
        this.localStorageService.setItem('data', JSON.stringify(session));
    }

    loadSessionData(): Session {
        var sessionStr = this.localStorageService.getItem('data');
        return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
    }

    getCurrentSession(): Session {
        return this.currentSession;
    }

    removeCurrentSession(): void {
        this.localStorageService.removeItem('data');
        this.currentSession = null;
    }

    logout(): void {
        this.removeCurrentSession();
    }

    getCurrentUser(): string {
        var session: Session = this.getCurrentSession();
        return (session && session.idusuario) ? session.idusuario : null;
    };
}