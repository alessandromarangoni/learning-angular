// Importazioni dei moduli necessari da Angular core e da Angular Material.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Il decoratore NgModule indica che questa classe è un modulo Angular.
@NgModule({
  // La sezione 'imports' definisce quali moduli sono richiesti da questo modulo.
  imports: [
    CommonModule,      // CommonModule fornisce funzionalità basilari di Angular, come le direttive ngIf e ngFor.
    MatToolbarModule,  // MatToolbarModule è un modulo di Angular Material che fornisce il componente della toolbar.
    MatListModule  ,    // MatListModule è un altro modulo di Angular Material che fornisce componenti per creare liste.
    MatButtonModule,    // MatButtonModule è un altro modulo di material che fornisce componenti per creare bottoni
    MatIconModule       // MatButtonModule è un altro modulo di material che fornisce componenti per creare icone
  ],
  // La sezione 'exports' rende questi moduli disponibili ai moduli che importano MaterialModule.
  exports: [
    CommonModule,      // Esportare CommonModule rende le sue direttive disponibili ai moduli che utilizzano MaterialModule.
    MatToolbarModule,  // Esportare MatToolbarModule permette l'utilizzo della toolbar di Angular Material.
    MatListModule,     // Esportare MatListModule consente l'uso dei componenti di lista di Angular Material.
    MatButtonModule,   // Esportare MatListModule consente l'uso dei componenti bottoni
    MatIconModule      // Esportare MatListModule consente l'uso dei componenti icone
  ]
})
// La definizione della classe del modulo, in questo caso MaterialModule.
export class MaterialModule { }
