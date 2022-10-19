import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAnimal } from '@app/animals/shared/models/animal.interface';

@Component({
  selector: 'app-animal-card',
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalCardComponent {

  @Input() animal!: IAnimal;

  @Input() clickable = false;

  @Input() large = false;

}
