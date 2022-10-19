import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animal-card-placeholder',
  templateUrl: './animal-card-placeholder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalCardPlaceholderComponent {
}
