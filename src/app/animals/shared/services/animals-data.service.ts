import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAnimalList } from '@app/animals/shared/models/animal-list.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AnimalsDataService {

  constructor(private readonly http: HttpClient) {
  }

  fetchList(): Observable<IAnimalList> {
    return this.http.get<IAnimalList>(`${environment.apiUrl}/api/${environment.apiVersion}/animals`);
  }

}
