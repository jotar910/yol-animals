import { IAnimal } from '@app/animals/shared/models/animal.interface';
import { IAnimalList } from '@app/animals/shared/models/animal-list.interface';

export const animalListMock = (): IAnimalList => ({
  items: animalListItemsMock()
})

export const animalListItemsMock = (): IAnimal[] => [
  {
    id: '1',
    name: 'Noah',
    type: 'dog',
    avatar: 'my-dog.image'
  },
  {
    id: '2',
    name: 'Alpha',
    type: 'cat',
    avatar: 'my-cat.image'
  },
  {
    id: '3',
    name: 'Flash',
    type: 'fish',
    avatar: 'my-fish.image'
  }
];

export const animalListItemMock = (index = 0): IAnimal => animalListItemsMock()[index];
