import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAnimalList } from '@app/animals/shared/models/animal-list.interface';
import { IAnimal } from '@app/animals/shared/models/animal.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AnimalsDataService {

  constructor(private readonly http: HttpClient) {
  }

  fetch(id: string): Observable<IAnimal> {
    return this.http.get<IAnimal>(`${environment.apiUrl}/api/${environment.apiVersion}/animals/${id}`);
  }

  fetchList(): Observable<IAnimalList> {
    return this.http.get<IAnimalList>(`${environment.apiUrl}/api/${environment.apiVersion}/animals`);
  }

}
