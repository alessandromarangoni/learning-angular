// Importazioni delle dipendenze essenziali.
// Injectable permette di definire questa classe come servizio iniettabile in Angular.
// Observable, of e throwError sono importati da RxJS per la gestione di flussi di dati asincroni.
import { Injectable } from '@angular/core';
import { Observable, finalize, of, throwError } from 'rxjs';

// Importazione di un set di dati mock (finti) degli utenti.
// Questi dati sono usati per simulare un database o una chiamata API.
import { MOCK_USERS } from '../mock/mock-users';

// Importazione del modello User, che definisce la struttura dei dati utente.
import { User } from '../model/user';

// Costante che definisce la chiave sotto cui gli utenti sono salvati in localStorage.
export const DEMO_USER_STORE = 'demo_user_store';

// Decoratore Injectable con opzione 'providedIn: root'.
// Questo rende il servizio disponibile globalmente nell'app.
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Array per memorizzare i dati degli utenti.
  users: User[] = [];

  // Costruttore eseguito alla creazione dell'istanza di UserService.
  constructor() {
    // Tentativo di recuperare gli utenti da localStorage.
    const stored: string | null = localStorage.getItem(DEMO_USER_STORE);
    // Se esistono dati salvati, convertili da JSON, altrimenti usa e salva i dati mock.
    this.users = stored ? JSON.parse(stored) : this.save(MOCK_USERS);
  }

  // Metodo per ottenere tutti gli utenti.
  // Restituisce un Observable che emette l'array degli utenti.
  getAll(): Observable<User[]> {
    return of(this.users);
  }

  // Metodo per ottenere un utente specifico in base al suo ID.
  // Restituisce un Observable dell'utente trovato o genera un errore se non trovato.
  get(id: number): Observable<User> {
    const user = this.users.find(u => u.id == id);
    return user ? of(user) : throwError(`Utente con id ${id} non trovato!`);
  }

// Metodo per aggiungere un nuovo utente.
// Aggiunge l'utente all'array e restituisce un Observable dell'utente aggiunto.
add(user: User): Observable<User> {
  // Aggiunge l'utente all'array di utenti.
  this.users.push(user);

  // Crea un Observable che emette l'utente appena aggiunto.
  return of(user)
    .pipe(
      // Utilizza l'operatore 'finalize' per eseguire una azione quando l'Observable completa la sua emissione.
      // 'finalize' viene eseguito sia che l'Observable completi normalmente, sia che venga interrotto da un errore.
      finalize(() => this.save(this.users))
    );
}

  // Metodo per rimuovere un utente in base al suo ID.
  // Rimuove l'utente dall'array se trovato e restituisce un Observable di undefined, altrimenti genera un errore.
  remove(id: number): Observable<undefined> {
    const userIndex = this.users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return of(undefined)
      .pipe(
        // Utilizza l'operatore 'finalize' per eseguire una azione quando l'Observable completa la sua emissione.
        // 'finalize' viene eseguito sia che l'Observable completi normalmente, sia che venga interrotto da un errore.
        finalize(() => this.save(this.users))
      );
    }
    return throwError(`Errore: Utente con id ${id} non trovato!`);
  }

  // Metodo privato per salvare gli utenti in localStorage.
  // Salva l'array di utenti come stringa JSON e lo restituisce.
  private save(users: User[]): User[] {
    localStorage.setItem(DEMO_USER_STORE, JSON.stringify(users));
    return users;
  }
}
