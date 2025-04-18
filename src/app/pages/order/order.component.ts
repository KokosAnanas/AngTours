import {Component, OnInit} from '@angular/core';
import {ToursService} from '../../services/tours.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ITour} from '../../models/tours';
import {InputNumberModule} from 'primeng/inputnumber';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {DatePickerModule} from 'primeng/datepicker';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-order',
  imports: [RouterLink,
            InputNumberModule,
            ReactiveFormsModule,
            InputTextModule,
            DatePickerModule,
            ButtonModule,
            ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  tourId: string = null;
  tour: ITour;
  userForm: FormGroup;

  constructor (private tourService: ToursService,
               private route: ActivatedRoute,
               ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(this.tourId).subscribe((tour) => {
      this.tour = tour;
    })

        // reactive form
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      carNumber: new FormControl(''),
      birthDate: new FormControl(''),
      age: new FormControl(''),
      citizenship: new FormControl(''),
    })
  }

}














