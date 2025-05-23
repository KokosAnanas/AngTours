import { Component, OnDestroy, OnInit } from '@angular/core';
import { AutorizationComponent } from "./autorization/autorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { TabsModule } from 'primeng/tabs';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  imports: [AutorizationComponent, RegistrationComponent, TabsModule, Toast],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, OnDestroy {

  ngOnInit(): void { }

  ngOnDestroy(): void { }

}
