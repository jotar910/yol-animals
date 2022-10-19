import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalDetailsComponent } from './animal-details/animal-details.component';
import { AnimalListComponent } from './animal-list/animal-list.component';
import { AnimalCardComponent } from './animal-card/animal-card.component';
import { AnimalCardPlaceholderComponent } from './animal-card-placeholder/animal-card-placeholder.component';
import { AnimalsDataService } from '@app/animals/shared/services/animals-data.service';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AnimalCardComponent,
    AnimalCardPlaceholderComponent,
    AnimalDetailsComponent,
    AnimalListComponent
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
