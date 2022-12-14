import { TestBed } from '@angular/core/testing';

import { AnimalsDataService } from './animals-data.service';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { animalListItemMock, animalListMock } from '@app/animals/shared/tests/mocks/animals.mock';
import { environment } from '../../../../environments/environment';

describe('AnimalsDataService', () => {
  let service: AnimalsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AnimalsDataService]
    });
    service = TestBed.inject(AnimalsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    const id = '1';
    service.fetch(id)
      .subscribe((data) => expect(data).toEqual(animalListItemMock()));

    const mockReq: TestRequest = httpMock.expectOne(`${environment.apiUrl}/api/${environment.apiVersion}/animals/${id}`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(animalListItemMock());
    httpMock.verify();
  });

  it('should fetch list', () => {
    const httpMock = TestBed.inject(HttpTestingController);
    service.fetchList()
      .subscribe((data) => expect(data).toEqual(animalListMock()));

    const mockReq: TestRequest = httpMock.expectOne(`${environment.apiUrl}/api/${environment.apiVersion}/animals`);
    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(animalListMock());
    httpMock.verify();
  });
});
