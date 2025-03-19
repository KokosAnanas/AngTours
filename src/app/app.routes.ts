import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayautComponent } from './layaut/layaut.component';
import { ToursComponent } from './pages/tours/tours.component';
import { TourItemComponent } from './pages/tour-item/tour-item.component';

export const routes: Routes = [
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{ path: 'tours', component: LayautComponent,
		children: [
			{ path: '', component: ToursComponent },
			{ path: 'tour/:id', component: TourItemComponent },
			{ path: 'tour', redirectTo: '', pathMatch: 'full' },
		]
	},
	
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  
];
