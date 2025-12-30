import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../models/user-info.model';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.css']
})
export class RegisterationComponent implements OnInit {

  user:UserInfo={};
  constructor(private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit(): void {
  }

  register() {
    this.authService.create(this.user).subscribe((res) => {
        this.router.navigate(['/login']);
      }, (error) => {
        
      });
  };

cancel() {
    this.router.navigate(['/login']);
  }

}
