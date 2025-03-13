import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../models/user';

@Component({
  selector: 'app-registration',
  imports: [NgClass, FormsModule, ButtonModule, CheckboxModule, InputTextModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})

export class RegistrationComponent implements OnInit  {

  login: string;
  password: string;
  repeatPassword: string;
  cardNamber: string;
  email: string;
  isRemember: boolean;
  labelText = 'Сохранить пользователя в хранилище';
  
  constructor(private userService: UserService) { }
    
  ngOnInit(): void { }

  onAuth(ev: Event): void {
    console.log('ev', ev)
    const postObj = {login: this.login, password: this.password, email:this.email} as IUserRegister
    this.userService.registerUser(postObj)
  }

  input(ev: Event): void {
  }
  
}
