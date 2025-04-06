import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-settings',
  imports: [
    Button,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})

export class SettingsComponent {

  menuItems = [
    { path: 'statistic', label: 'Статистика' },
    { path: 'change-password', label: 'Смена пароля' }
  ]


}
