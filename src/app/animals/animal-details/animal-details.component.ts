import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalDetailsComponent {
}
