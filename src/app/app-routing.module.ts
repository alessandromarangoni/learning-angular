// Importazioni necessarie da Angular core e dal modulo di routing.
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importazione dei componenti che saranno utilizzati nelle rotte.
import { NavigationComponent } from './navigation/navigation.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './services/guards/authentication.guard';

// Definizione di un array di rotte. Ogni oggetto route definisce un percorso URL e il componente che deve essere visualizzato.
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // Questa è la rotta base ('').
    path: '',
    // Il componente che verrà caricato quando l'URL corrisponde al percorso base.
    component: NavigationComponent,
    canActivate: [AuthenticationGuard],

    // 'children' definisce un array di rotte figlie.d
    children: [
      {
        // Quando l'URL è semplicemente '/', carica il componente UsersComponent.
        path: '',
        component: UsersComponent
      },
      {
        // Quando l'URL segue il formato '/user/:id', carica UserDetailsComponent.
        // ':id' è un parametro dinamico che può essere recuperato nel componente.
        path: 'user/:id',
        component: UserDetailsComponent
      }
    ]
  }
];

// Decoratore NgModule che definisce questo classe come un modulo Angular.
@NgModule({
  // RouterModule.forRoot(routes) configura il router a livello dell'applicazione con le rotte definite sopra.
  imports: [RouterModule.forRoot(routes)],
  // Esporta RouterModule per renderlo disponibile in tutto l'app.
  exports: [RouterModule]
})
// Classe del modulo di routing.
export class AppRoutingModule { }
