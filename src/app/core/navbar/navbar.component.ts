import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { LogoutService } from './../../seguranca/logout.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(
    public auth: AuthService,
    private logoutService: LogoutService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.logoutService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      error => this.errorHandler.handle(error)
    );
  }
}
