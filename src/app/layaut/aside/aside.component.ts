import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import {Checkbox} from 'primeng/checkbox';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
  imports: [SelectModule, FormsModule, DatePickerModule, Checkbox],
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);

  date: Date = null; // или new Date()

  selectedType: any = null; // TODO defined type

  tourTypes: {key: string, label: string}[] = [                    // TODO defined type
    { key: 'single', label: 'Одиночный' },
    { key: 'group', label: 'Групповой' },
    { key: 'all', label: 'Все' },
  ];


  ngOnInit(): void {
    this.selectedType = this.tourTypes.find((type) => type.key === 'all');
  }

  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType);
  }

  changeDate(ev: Date): void {
    console.log('****change date');
    this.tourService.initChangeTourDate(ev)
  }


}
