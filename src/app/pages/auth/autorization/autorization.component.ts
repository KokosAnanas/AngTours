import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './autorization.component.html',
  styleUrl: './autorization.component.scss',
})
export class AutorizationComponent implements OnInit, OnDestroy  {
  
  login: string;
  password: string;

  constructor(private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onAuth(): void {
    const user: IUser = {
      login: this.login,
      password: this.password,
    }
    this.userService.authUser(user);
    this.router.navigate(['tickets']);
  }
}
