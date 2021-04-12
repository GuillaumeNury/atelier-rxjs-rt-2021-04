import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Case1Component } from './cases/case1/case1.component';

const routes: Routes = [
  { path: 'case-1', component: Case1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
