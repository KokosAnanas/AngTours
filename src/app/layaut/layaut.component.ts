import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layaut',
  imports: [RouterModule, AsideComponent, FooterComponent, HeaderComponent],
  templateUrl: './layaut.component.html',
  styleUrl: './layaut.component.scss'
})
export class LayautComponent {

}
