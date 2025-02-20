import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TeacherService } from './teacher.service';
import { TeacherFactory } from '../models/teacher.factory';
import { Teacher } from '../interfaces/teacher.interface';

describe('TeacherService', () => {
  let service: TeacherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeacherService]
    });
    service = TestBed.inject(TeacherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test unitaire : vérifier que le service peut être instancié sans erreur
  // Intérêt : s'assurer que le service s'initialise correctement
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test unitaire : vérifier que la méthode all() récupère tous les enseignants
  // Intérêt : s'assurer que la méthode all() fait un appel HTTP GET et retourne les données attendues
  it('should retrieve all teachers', () => {
    const dummyTeachers: Teacher[] = [
      TeacherFactory.create(),
      TeacherFactory.create({ id: 2, firstName: 'John', lastName: 'Doe' })
    ];

    service.all().subscribe(teachers => {
      expect(teachers.length).toBe(2);
      expect(teachers).toEqual(dummyTeachers);
    });

    const req = httpMock.expectOne('api/teacher');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTeachers);
  });

  // Test unitaire : vérifier que la méthode detail() récupère les détails d'un enseignant
  // Intérêt : s'assurer que la méthode detail() fait un appel HTTP GET et retourne les données attendues
  it('should retrieve teacher detail', () => {
    const dummyTeacher: Teacher = TeacherFactory.create();

    service.detail('1').subscribe(teacher => {
      expect(teacher).toEqual(dummyTeacher);
    });

    const req = httpMock.expectOne('api/teacher/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyTeacher);
  });
});
