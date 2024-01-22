import { Injectable } from '@angular/core';
import { Authentication } from '../model/authentication';
import { Observable, of } from 'rxjs';

// Chiave usata per memorizzare i dati di autenticazione in localStorage.
export const ACCESS_TOKEN = 'demo-access-store';

// Decoratore Injectable, rende il servizio disponibile per l'iniezione di dipendenze.
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // Proprietà per memorizzare i dati di autenticazione correnti.
  private authentication?: Authentication;

  constructor() {
    // Nel costruttore, prova a recuperare i dati di autenticazione dal localStorage.
    const stored = localStorage.getItem(ACCESS_TOKEN);
    if(stored){
      // Se i dati sono presenti, li parsa e li assegna alla proprietà authentication.
      this.authentication = JSON.parse(stored) as Authentication;
    }
  }

  // Metodo per ottenere i dati di autenticazione correnti.
  getAuthentication(): Authentication | undefined {
    return this.authentication;
  }

  // Metodo per gestire il login.
  login(username: string, password: string): Observable<void> {
    // Imposta la data corrente e la data di scadenza (1 ora in avanti).
    const loginDate = new Date();
    const expirationDate = new Date(loginDate.getTime() + (60 * 60000)); // 1 ora

    // Aggiorna la proprietà authentication con le nuove credenziali e le date.
    this.authentication = { username, password, loginDate, expirationDate };

    // Salva i dati di autenticazione in localStorage e restituisce un Observable.
    return of(localStorage.setItem(ACCESS_TOKEN, JSON.stringify(this.authentication)));
  }
  
  // Metodo per gestire il logout.
  logout(): Observable<void> {
    // Rimuove i dati di autenticazione correnti.
    this.authentication = undefined;

    // Rimuove i dati di autenticazione da localStorage e restituisce un Observable.
    return of(localStorage.removeItem(ACCESS_TOKEN));
  }
}
