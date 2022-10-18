import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAnimal } from '@app/animals/shared/models/animal.interface';

@Component({
  selector: 'app-animal-item',
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalItemComponent {

  @Input() animal!: IAnimal;

}
