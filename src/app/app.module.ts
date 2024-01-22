// Importazioni standard per un modulo Angular.
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// Importazione dei moduli e componenti specifici dell'applicazione.
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { LoginComponent } from './pages/login/login.component';

// Decoratore NgModule che definisce la classe come un modulo Angular.
@NgModule({
  // 'declarations' elenca tutti i componenti, direttive e pipe che appartengono a questo modulo.
  declarations: [
    AppComponent,
    NavigationComponent,
    UsersComponent,
    UserDetailsComponent,
    CreateUserDialogComponent,
    LoginComponent
  ],
  // 'imports' elenca altri moduli i cui componenti esportati sono necessari in questo modulo.
  imports: [
    BrowserModule,         // BrowserModule fornisce servizi e direttive Angular specifici per il browser.
    AppRoutingModule,     // AppRoutingModule definisce le rotte dell'app.
    BrowserAnimationsModule, // BrowserAnimationsModule supporta le animazioni per la piattaforma browser.
    MaterialModule        // MaterialModule fornisce componenti di Angular Material.
  ],
  // 'providers' elenca i servizi a iniezione di dipendenza.
  providers: [
    provideClientHydration() // Probabilmente una funzione per gestire l'idratazione del client in SSR.
  ],
  // 'bootstrap' elenca i componenti radice, ovvero i componenti da caricare all'avvio dell'applicazione.
  bootstrap: [AppComponent]
})
export class AppModule { }
