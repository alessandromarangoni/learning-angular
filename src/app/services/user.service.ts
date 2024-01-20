// Importa le dipendenze necessarie. Injectable è un decoratore che permette di definire questa classe come un servizio in Angular.
// Observable, of e throwError sono importati da RxJS, che è una libreria per la programmazione reattiva in JavaScript.
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

// Importa un mock-up dei dati utente. Questo è probabilmente un array statico usato per simulare dati reali.
import { MOCK_USERS } from '../mock/mock-users';
// Importa la definizione del modello User, che definisce la struttura di un oggetto User.
import { User } from '../model/user';

// Il decoratore Injectable con l'opzione 'providedIn: root' indica che questo servizio può essere iniettato in qualsiasi parte dell'applicazione.
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Dichiarazione di un array di utenti.
  users: User[] = []

  // Il costruttore viene eseguito quando viene creata un'istanza di UserService.
  constructor() {
    // Inizializza l'array di utenti con i dati mock.
    this.users = MOCK_USERS;
  }

  // Metodo per ottenere tutti gli utenti. Restituisce un Observable di un array di User.
  getAll() : Observable<User[]>{
    // 'of' è una funzione di RxJS che converte i dati in un Observable. Qui, converte l'array di utenti in un Observable.
    return of(this.users);
  }

  // Metodo per ottenere un utente specifico tramite il suo ID. Restituisce un Observable di User.
  get(id: number): Observable<User>{
    // Cerca l'utente nell'array usando la funzione find.
    const user = MOCK_USERS.find(u => u.id == id)
    // Se l'utente è trovato, lo restituisce come Observable. Altrimenti, genera un errore.
    return user ? of(user) : throwError(`Utente con id ${id} non trovato!`);
  }

  add(user : User){
    this.users.push(user)
    return of(user)
  }

  remove(id: number){
    const userIndex = this.users.findIndex(u => u.id === id)
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
      return of(undefined)
    }
    return throwError(`Errore: Utente con id ${id} non trovato!`);
  }
}
