// Importa le dipendenze necessarie.
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs/operators';

// Decoratore Component che definisce la configurazione del componente, come il selettore, il file del template HTML e il file dello stile CSS.
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  // Proprietà 'users' che conterrà l'elenco degli utenti.
  users : User[] = [];

  // Costruttore che inietta il servizio UserService.
  constructor(private readonly userService : UserService) {
  }

  // Metodo ngOnInit viene chiamato quando il componente è inizializzato.
  ngOnInit(): void {
    // Chiama il metodo 'getAll' del UserService per ottenere tutti gli utenti.
    this.userService.getAll()
      .pipe(
        // Utilizza l'operatore 'map' di RxJS per assegnare la risposta (un array di User) alla proprietà 'users'.
        map((users : User[]) => this.users = users)
      )        
      .subscribe(); // Si sottoscrive all'Observable restituito da 'getAll' per iniziare a ricevere i valori.
  }
}
