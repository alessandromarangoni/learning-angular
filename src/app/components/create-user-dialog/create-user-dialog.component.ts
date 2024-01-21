// Importazioni necessarie per Angular e Angular Material.
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';

// Decoratore Component per definire metadati essenziali per il componente.
@Component({
  selector: 'app-create-user-dialog', // Identificatore unico del componente.
  templateUrl: './create-user-dialog.component.html', // Percorso del template HTML.
  styleUrl: './create-user-dialog.component.scss' // Percorso del file di stile.
})
export class CreateUserDialogComponent implements OnInit {
  // Proprietà 'user' di tipo 'User', inizializzata con un valore non definito ma assegnata nel costruttore.
  user!: User;

  // Costruttore del componente.
  constructor(
    // Iniezione di MatDialogRef per interagire con il dialogo corrente.
    // MatDialogRef è parametrizzato con il tipo del componente del dialogo stesso e il tipo di ritorno.
    public readonly ref: MatDialogRef<CreateUserDialogComponent, User>,
  ) {
    // Inizializzazione dell'oggetto user con valori di default.
    // Assegna un ID univoco basato sul timestamp corrente.
    this.user = { id: new Date().getTime(), nome: '', cognome: '' };
  }

  // Metodo ngOnInit, parte del ciclo di vita di Angular.
  // Viene eseguito dopo la creazione del componente.
  ngOnInit(): void {
    // Attualmente vuoto. Utilizzato per logica di inizializzazione.
  }

  // Metodo per chiudere il dialogo.
  close(): void {
    // Chiama il metodo close su MatDialogRef, passando l'utente creato/modificato.
    // Questo valore può essere catturato dal componente che ha aperto il dialogo.
    this.ref.close(this.user);
  }
}
