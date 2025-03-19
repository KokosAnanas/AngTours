import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tours',
  imports: [CardModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
})
export class ToursComponent implements OnInit {
  tours: any = []; // TODO add types

  constructor( private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router ) {}

  ngOnInit(): void {
    console.log('activetedRoute', this.route)
    this.toursService.getTours().subscribe((data) => {
      if (Array.isArray(data?.tours)) {
        this.tours = data.tours;
      }
    });
  }

  goToTour(item: any): void { // TODO add interface
    this.router.navigate(['tour', item.id], {relativeTo: this.route});
  }
}
