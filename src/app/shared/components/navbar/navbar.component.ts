import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports:[CommonModule,RouterLink,ButtonComponent,NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();          // Clear session
    this.router.navigate(['/login']);   // Redirect to login page
  }
}
