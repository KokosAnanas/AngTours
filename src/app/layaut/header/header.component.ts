import {Component, inject, NgZone, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, DatePipe} from '@angular/common';
import { UserService } from '../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import { MenuItem } from 'primeng/api';
import { IUser } from '../../models/user';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import {Tooltip} from 'primeng/tooltip';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {Observable} from 'rxjs';
import {ITour} from '../../models/tours';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe, MenubarModule, ButtonModule, Tooltip, OverlayBadgeModule, AsyncPipe, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  dateTime: Date;
  menuItems: MenuItem[] = [];
  user: IUser;
  logoutIcon = 'pi pi-user';
  basketStore$: Observable<ITour[]> = null;

  constructor(
              private userService: UserService,
              private router: Router,
              private ngZone: NgZone,
              private basketService: BasketService,
              ) {}

  ngOnInit(): void {
    this.basketStore$ = this.basketService.basketStore$;

    this.user = this.userService.getUser();
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
    this.userService.setUser(null);
    this.router.navigate(['/auth']);
  }

  hoverLogoutBtn(val: boolean): void {
    this.logoutIcon = val ? 'pi pi-sign-out' : 'pi pi-user';
  }

  getLogin() {
    return this.user?.login
  }

}

