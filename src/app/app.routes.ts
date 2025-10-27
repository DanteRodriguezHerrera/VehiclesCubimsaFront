import { Routes } from '@angular/router';
import { VehiclesComponent } from './components/vehicles/vehicles.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/vehicles',
        pathMatch: 'full'
    },
    {
        path: 'vehicles',
        component: VehiclesComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
