import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmpsFormComponent } from './components/emps-form/emps-form.component';
import { EmpsComponent } from './components/emps/emps.component';

const routes: Routes = [
  { path: 'home', component: EmpsComponent },
  { path: 'emps', component: EmpsFormComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
