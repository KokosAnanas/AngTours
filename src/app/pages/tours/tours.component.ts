import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {ITour} from '../../models/tours';

@Component({
  selector: 'app-tours',
  imports: [CardModule, InputGroup, InputGroupAddon, Button, InputText],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})

export class ToursComponent implements OnInit {
  tours: ITour[] = []; // TODO add types
  toursStore: ITour[] = [];

  constructor( private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {
    console.log('activatedRoute', this.route)
    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
        this.toursStore = [...data.tours];
      }
    });
  }

  goToTour(item: any): void { // TODO add interface
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  }

  searchTours(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const targetValue = target.value;
    this.tours = this.toursService.searchTours(this.toursStore, targetValue);
  }
}
