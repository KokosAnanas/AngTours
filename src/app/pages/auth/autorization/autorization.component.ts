import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IUser } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onAuth(): void {
    const user: IUser = {
      login: this.login,
      password: this.password,
    }
    this.userService.authUser(user).subscribe(
      () => {this.router.navigate(['tours']);},
      () => {this.initToast('error', 'Не верный login или password');}
    );
  }

  initToast(type: 'error' | 'success', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });
  }
}
