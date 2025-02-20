import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AuthFactory } from '../model/auth.factory';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let authFactory: AuthFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    authFactory = new AuthFactory();
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test unitaire : vérifier que le service peut être instancié sans erreur
  // Intérêt : s'assurer que le service s'initialise correctement
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test unitaire : vérifier que la méthode register() enregistre un utilisateur
  // Intérêt : s'assurer que la méthode register() fait un appel HTTP POST et retourne les données attendues
  it('should register a user', () => {
    const registerRequest: RegisterRequest = authFactory.createRegisterRequest();

    service.register(registerRequest).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne('api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  // Test unitaire : vérifier que la méthode login() connecte un utilisateur
  // Intérêt : s'assurer que la méthode login() fait un appel HTTP POST et retourne les données attendues
  it('should login a user', () => {
    const loginRequest: LoginRequest = authFactory.createLoginRequest();
    const sessionInformation: SessionInformation = {
      token: 'dummy-token',
      type: 'Bearer',
      id: 1,
      username: 'dummy@stub.com',
      firstName: 'Master',
      lastName: 'Yoga',
      admin: true
    };

    service.login(loginRequest).subscribe(session => {
      expect(session).toEqual(sessionInformation);
    });

    const req = httpMock.expectOne('api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(sessionInformation);
  });
});
