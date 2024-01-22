// Importa le dipendenze necessarie.
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { map, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserDialogComponent } from '../../components/create-user-dialog/create-user-dialog.component';
import { Observable } from 'rxjs';
import { TitleService } from '../../services/title.service';

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
  constructor(
    private readonly userService : UserService,
    private readonly dialog: MatDialog,
    private readonly titleService: TitleService
    ) {
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
      this.titleService.title.next('Users');
  }

// Metodo 'create' per aprire una finestra di dialogo per creare un nuovo utente.
create(): void {
  // Apre il dialogo utilizzando MatDialog, e specifica il componente CreateUserDialogComponent.
  this.dialog.open(CreateUserDialogComponent)
    .afterClosed() // Gestisce l'evento che si verifica quando il dialogo viene chiuso.
    .pipe(
      // Utilizza switchMap per trasformare il valore restituito dal dialogo in un'altra azione.
      switchMap((user?: User) => 
        // Controlla se un utente è stato passato dal dialogo (cioè se il dialogo non è stato chiuso senza inviare dati).
        user ? 
          this.userService.add(user) // Se c'è un utente, chiama il metodo 'add' di userService per aggiungerlo.
          : new Observable(sub => sub.complete()) // Se non c'è utente, crea un Observable che completa subito.
      )
    )
    .subscribe(
      // Una volta che l'utente è stato aggiunto, esegue il codice nel metodo subscribe.
      (user: any) => console.log(`Utente creato: ${user.id}`) // Stampa un messaggio di conferma nella console.
    );
}

}
