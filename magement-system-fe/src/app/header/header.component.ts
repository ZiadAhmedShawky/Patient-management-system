import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router,private auth:AuthService) { }

  ngOnInit(): void {
  }

    logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  navigateToAppointment() {
    this.router.navigate(['/appointments']);
  }
  navigateToPatient() {
    this.router.navigate(['/patients']);
  }

  checkAuthority(): boolean {
    const roles = this.auth.getUserRoles();
    if (roles.includes('ADMIN')) {
      return true;
    }
    return false;
  }
  navigateToRegisteration() {
    this.router.navigate(['/registeration']);
  }
}
