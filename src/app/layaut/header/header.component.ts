import {Component, inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-header',
  imports: [ DatePipe, MenubarModule, ButtonModule ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem[] = [];
  user: IUser;
  logoutIcon = 'pi pi-user';
  private ngZone = inject(NgZone);

  constructor(private userServise: UserService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.userServise.getUser();
    this.menuItems = this.initMenuItems();

    this.ngZone.runOutsideAngular(() => setInterval(() => {
      this.dateTime = new Date();
    }, 1000))

  }

  ngOnDestroy(): void {}

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['/tours'],
      },
      {
        label: 'Настройки',
        routerLink: ['/setting'],
      },
      {
        label: 'Заказы',
        routerLink: ['/orders'],
      },
    ];
  }

  logOut(): void {
    this.userServise.setUser(null);
    this.router.navigate(['/auth']);
  }

  hoverLogoutBtn(val: boolean): void {
    this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
  }

}

