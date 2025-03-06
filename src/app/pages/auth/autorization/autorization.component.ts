import { NgClass } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-autorization',
  imports: [NgClass, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './autorization.component.html',
  styleUrl: './autorization.component.scss',
})
export class AutorizationComponent implements OnInit, OnDestroy  {
  
  login: string;
  password: string;

  ngOnInit(): void {}
  ngOnDestroy(): void {}


}
