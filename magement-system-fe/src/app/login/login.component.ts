import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRequest } from '../models/UserRequest.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  error = '';
  userRequest: UserRequest = {
  email: '',
  password: ''
};

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  submit() {    
    this.auth.login({email: this.userRequest.email, password: this.userRequest.password}).subscribe((response) => {      
      this.auth.saveToken(response.token);
      this.auth.redirectByRole();
    });
  }
}