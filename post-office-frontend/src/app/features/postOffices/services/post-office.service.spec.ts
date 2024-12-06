import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostOfficeService } from './post-office.service';
import { environment } from '../../../../environments/environment';
import { PostOffice } from '../models/postOffice.model';

fdescribe('PostOfficeService', () => {
  let service: PostOfficeService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/post-offices`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostOfficeService],
    });
    service = TestBed.inject(PostOfficeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch all post offices', () => {
    const mockPostOffices: PostOffice[] = [
      { id: 1, name: 'Post Office A', zipCode: '12345' },
      { id: 2, name: 'Post Office B', zipCode: '54321' },
    ];

    service.getPostOffices().subscribe((response) => {
      expect(response).toEqual(mockPostOffices);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockPostOffices);
  });

  it('should fetch post offices with paging', () => {
    const page = 1;
    const limit = 5;
    const mockResponse = {
      data: [
        { id: 1, name: 'Post Office A', zipCode: '12345' },
        { id: 2, name: 'Post Office B', zipCode: '54321' },
      ],
      total: 10,
    };

    service.getPostOfficesWithPaging(page, limit).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/paging?page=${page}&limit=${limit}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a post office by ID', () => {
    const postOfficeId = 1;
    const mockPostOffice: PostOffice = { id: postOfficeId, name: 'Post Office A', zipCode: '12345' };

    service.getPostOfficeById(postOfficeId).subscribe((response) => {
      expect(response).toEqual(mockPostOffice);
    });

    const req = httpMock.expectOne(`${apiUrl}/${postOfficeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPostOffice);
  });

  it('should add a new post office', () => {
    const newPostOffice: PostOffice = { id: 3, name: 'Post Office C', zipCode: '67890' };

    service.addPostOffice(newPostOffice).subscribe((response) => {
      expect(response).toEqual(newPostOffice);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newPostOffice);
    req.flush(newPostOffice);
  });

  it('should update a post office', () => {
    const postOfficeId = 1;
    const updatedPostOffice: Partial<PostOffice> = { name: 'Updated Post Office', zipCode: '98765' };
    const mockUpdatedPostOffice: PostOffice = {
      id: postOfficeId,
      name: updatedPostOffice.name || '',
      zipCode: updatedPostOffice.zipCode || '',
    };

    service.updatePostOffice(postOfficeId, updatedPostOffice).subscribe((response) => {
      expect(response).toEqual(mockUpdatedPostOffice);
    });

    const req = httpMock.expectOne(`${apiUrl}/${postOfficeId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedPostOffice);

    req.flush(mockUpdatedPostOffice);
  });

  it('should delete a post office', () => {
    const postOfficeId = 3;

    service.deletePostOffice(postOfficeId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/${postOfficeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
