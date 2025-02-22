import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowsComponent } from './components/shows/shows.component';
import { AdvertisementsComponent } from './components/advertisements/advertisements.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AgentsComponent } from './components/agents/agents.component';

// const routes: Routes = [
//   { path: 'shows', component: ShowsComponent },
//   { path: 'advertisements', component: AdvertisementsComponent },
//   { path: 'customers', component: CustomersComponent },
//   { path: 'agents', component: AgentsComponent },
//   { path: '', redirectTo: '/shows', pathMatch: 'full' },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
export const routes: Routes = [
  { path: 'shows', component: ShowsComponent },
  { path: 'advertisements', component: AdvertisementsComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'agents', component: AgentsComponent },
  { path: '', redirectTo: '/shows', pathMatch: 'full' },
];
