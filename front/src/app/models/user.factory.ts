import { User } from "../interfaces/user.interface";


export class UserFactory{
    static create(overrides?: Partial<User>): User{
      return {
        id: 1,
        lastName: 'Master',
        firstName: 'Yoga',
        email: 'dummy@stub.com',
        password: 'password',
        admin: true,
        createdAt: new Date(),
        ...overrides
      };
    }
};
