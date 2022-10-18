import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { RouteEnums } from '../shared/enums/route.enums';

const routes: Routes = [
  {
    path: RouteEnums.EMPTY,
    component: AnimalListComponent
  },
  {
    path: RouteEnums.ANIMALS_ID,
    component: AnimalDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: RouteEnums.WILDCARD,
    redirectTo: RouteEnums.EMPTY
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule { }
