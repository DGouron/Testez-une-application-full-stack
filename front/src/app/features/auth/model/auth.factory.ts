import { LoginRequest } from "../interfaces/loginRequest.interface";
import { RegisterRequest } from "../interfaces/registerRequest.interface";

export class AuthFactory {

  createLoginRequest(overrides?: Partial<LoginRequest>): LoginRequest {
    return {
      email: 'dummy@stub.com',
      password: '1234',
      ...overrides
    };
  };

  createRegisterRequest(overrides?: Partial<RegisterRequest>): RegisterRequest {
    return {
      email: 'dummy@stub.com',
      password: '1234',
      firstName: 'Master',
      lastName: 'Yoga',
      ...overrides
    };
  };
};