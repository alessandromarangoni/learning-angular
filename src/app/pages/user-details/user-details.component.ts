// Importazioni necessarie per il componente.
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { TitleService } from '../../services/title.service';

// Decoratore Component che configura il componente.
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  // Proprietà 'user' che terrà traccia dell'utente corrente, potenzialmente undefined.
  user?: User;

  // Costruttore che inietta ActivatedRoute, UserService e Router.
  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly titleService: TitleService
  ) { }

  // Metodo ngOnInit viene chiamato quando il componente viene inizializzato.
  ngOnInit(): void {
    this.route.params
      .pipe(
        // switchMap prende i parametri della rotta, estrae l'ID e lo usa per ottenere l'utente dal userService.
        switchMap(params => this.userService.get(+params['id'])),
        // catchError intercetta eventuali errori, reindirizza alla home page e propaga l'errore.
        catchError(err => {
          this.router.navigate(['/']);
          throw err;
        }),
        // map assegna l'utente ottenuto alla proprietà 'user'.
        map((user: User) =>{
          this.user = user;
          this.titleService.title.next(`Utente ${user.id}`);
        })
      )
      .subscribe();
  }

 // Metodo 'delete' per rimuovere un utente.
 delete(user: User){
  // Chiama il metodo 'remove' di UserService passando l'ID dell'utente da eliminare.
  this.userService.remove(user.id)
    .subscribe(
      // Una volta che l'utente è stato rimosso con successo...
      () => {
        // Stampa un messaggio di conferma nella console.
        console.log(`${user.nome} rimosso!`);
        // Reindirizza l'utente alla root '/' dell'applicazione.
        this.router.navigate(['/']);
      },
      // In caso di errore nella richiesta di eliminazione...
      err => {
        // Stampa l'errore nella console.
        console.error(err);
      }
    );
}
}
