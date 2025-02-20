import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;
  let sessionServiceMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    };

    routerMock = {
      navigate: jest.fn()
    };

    sessionServiceMock = {
      logIn: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: SessionService, useValue: sessionServiceMock }
      ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test unitaire : vérifier que le formulaire est invalide avec des valeurs incorrectes
  it('should have invalid form when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  // Test unitaire : vérifier que le formulaire est valide avec des valeurs correctes
  it('should have valid form when filled correctly', () => {
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('1234');
    expect(component.form.valid).toBeTruthy();
  });

  // Test d’intégration : vérifier que submit() appelle le service d’authentification et navigue en cas de succès
  it('should call authService and navigate on successful login', () => {
    const loginResponse = { id: 1, token: 'token' };
    authServiceMock.login.mockReturnValue(of(loginResponse));
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('1234');
    component.submit();
    expect(authServiceMock.login).toHaveBeenCalled();
    expect(sessionServiceMock.logIn).toHaveBeenCalledWith(loginResponse);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/sessions']);
  });

  // Test d’intégration : vérifier que submit() gère les erreurs correctement
  it('should set onError to true on login error', () => {
    authServiceMock.login.mockReturnValue(throwError('error'));
    component.form.controls['email'].setValue('test@test.com');
    component.form.controls['password'].setValue('1234');
    component.submit();
    expect(component.onError).toBe(true);
  });
});
