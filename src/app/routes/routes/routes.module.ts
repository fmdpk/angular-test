import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const AppRoute: Routes = [];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(AppRoute)],
  declarations: [],
  exports: [RouterModule],
})
export class RoutesModule {}
