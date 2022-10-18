import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalItemComponent } from './animal-item/animal-item.component';
import { AnimalItemLoadingComponent } from './animal-item-loading/animal-item-loading.component';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AnimalDetailsComponent,
    AnimalListComponent,
    AnimalItemComponent,
    AnimalItemLoadingComponent
  ],
  imports: [
    CommonModule,
    AnimalsRoutingModule,
    SharedModule
  ],
  providers: [
    AnimalsDataService
  ]
})
export class AnimalsModule {
}
