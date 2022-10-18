import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-animal-item-loading',
  templateUrl: './animal-item-loading.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimalItemLoadingComponent {
}
