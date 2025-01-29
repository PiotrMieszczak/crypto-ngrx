import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TaskApiService } from './task-api.service';
import { API_URL } from '../injectables';
import { TaskDTO } from '../domain/task/dto';
import { provideHttpClient } from '@angular/common/http';

describe('TaskApiService', () => {
  let service: TaskApiService;
  let httpMock: HttpTestingController;
  const mockApiUrl = 'http://mock-path';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: mockApiUrl }
      ]
    });

    service = TestBed.inject(TaskApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tasks from the API', (done) => {
    const mockTasks: TaskDTO[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ];

    service.getTasks().subscribe((tasks) => {
      expect(tasks).toEqual(mockTasks);
      done();
    });

    const req = httpMock.expectOne(mockApiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockTasks);
  });

  it('should handle HTTP errors', (done) => {
    service.getTasks().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
        done();
      }
    });

    const req = httpMock.expectOne(mockApiUrl);
    req.flush('Server error', { status: 500, statusText: 'Internal Server Error' });
  });
});
