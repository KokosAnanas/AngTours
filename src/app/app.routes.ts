import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayautComponent } from './layaut/layaut.component';
import { ToursComponent } from './pages/tours/tours.component';

export const routes: Routes = [
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{ path: 'tours', component: LayautComponent,
		children: [
			{ path: '', component: ToursComponent }
		]
	},
	
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  
];
