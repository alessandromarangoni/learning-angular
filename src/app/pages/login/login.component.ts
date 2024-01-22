import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username?: string;
  password?: string;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.logout();
  }

  login(): void {
    if (this.username == 'admin' && this.password == 'password') {
      this.authenticationService.login(this.username, this.password)
        .subscribe(
          () => {
            this.snackBar.open(`Benvenuto ${this.username}`);
            this.router.navigate(['/']);
          },
          (err: any) => this.snackBar.open(`Accesso non riuscito: ${err}`)
        );
    } else {
      this.snackBar.open('Inserisci un nome e una password corretti');
    }
  }

 logout(): void {
    this.authenticationService.logout()
      .subscribe(() => this.snackBar.open('Logout effettuato'));
  }

}
