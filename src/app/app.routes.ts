import { Routes } from '@angular/router';
import { PfpContainerComponent } from './pfp-container/pfp-container.component';
import { PfpDetailsComponent } from './pfp-details/pfp-details.component';

export const routes: Routes = [
    { path: '', component: PfpContainerComponent },
    { path: ':id', component: PfpDetailsComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
