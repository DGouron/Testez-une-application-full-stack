import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SessionApiService } from './session-api.service';
import { SessionFactory } from '../model/session.factory';
import { Session } from '../interfaces/session.interface';

describe('SessionApiService', () => {
  let service: SessionApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SessionApiService]
    });
    service = TestBed.inject(SessionApiService);
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

  // Test unitaire : vérifier que la méthode all() récupère toutes les sessions
  // Intérêt : s'assurer que la méthode all() fait un appel HTTP GET et retourne les données attendues
  it('should retrieve all sessions', () => {
    const dummySessions: Session[] = [
      SessionFactory.create(),
      SessionFactory.create({ id: 2, name: 'Advanced Yoga' })
    ];

    service.all().subscribe(sessions => {
      expect(sessions.length).toBe(2);
      expect(sessions).toEqual(dummySessions);
    });

    const req = httpMock.expectOne('api/session');
    expect(req.request.method).toBe('GET');
    req.flush(dummySessions);
  });

  // Test unitaire : vérifier que la méthode detail() récupère les détails d'une session
  // Intérêt : s'assurer que la méthode detail() fait un appel HTTP GET et retourne les données attendues
  it('should retrieve session detail', () => {
    const dummySession: Session = SessionFactory.create();

    service.detail('1').subscribe(session => {
      expect(session).toEqual(dummySession);
    });

    const req = httpMock.expectOne('api/session/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummySession);
  });

  // Test unitaire : vérifier que la méthode create() crée une nouvelle session
  // Intérêt : s'assurer que la méthode create() fait un appel HTTP POST et retourne les données attendues
  it('should create a session', () => {
    const newSession: Session = SessionFactory.create({ id: 3, name: 'New Yoga Session' });

    service.create(newSession).subscribe(session => {
      expect(session).toEqual(newSession);
    });

    const req = httpMock.expectOne('api/session');
    expect(req.request.method).toBe('POST');
    req.flush(newSession);
  });

  // Test unitaire : vérifier que la méthode update() met à jour une session existante
  // Intérêt : s'assurer que la méthode update() fait un appel HTTP PUT et retourne les données attendues
  it('should update a session', () => {
    const updatedSession: Session = SessionFactory.create({ id: 1, name: 'Updated Yoga Session' });

    service.update('1', updatedSession).subscribe(session => {
      expect(session).toEqual(updatedSession);
    });

    const req = httpMock.expectOne('api/session/1');
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSession);
  });

  // Test unitaire : vérifier que la méthode delete() supprime une session
  // Intérêt : s'assurer que la méthode delete() fait un appel HTTP DELETE et retourne les données attendues
  it('should delete a session', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('api/session/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  // Test unitaire : vérifier que la méthode participate() ajoute un utilisateur à une session
  // Intérêt : s'assurer que la méthode participate() fait un appel HTTP POST et retourne les données attendues
  it('should participate in a session', () => {
    service.participate('1', '1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('api/session/1/participate/1');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  // Test unitaire : vérifier que la méthode unParticipate() retire un utilisateur d'une session
  // Intérêt : s'assurer que la méthode unParticipate() fait un appel HTTP DELETE et retourne les données attendues
  it('should unParticipate in a session', () => {
    service.unParticipate('1', '1').subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('api/session/1/participate/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
