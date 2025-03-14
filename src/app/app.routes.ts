import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LayautComponent } from './layaut/layaut.component';

export const routes: Routes = [
	{ path: 'auth', component: AuthComponent },
	{ path: '', redirectTo: '/auth', pathMatch: 'full' },
	{ path: 'tickets', component: LayautComponent },
	
    { path: '**', redirectTo: '/auth', pathMatch: 'full' },  
];
