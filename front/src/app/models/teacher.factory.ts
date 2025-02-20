import { Teacher } from "../interfaces/teacher.interface";


export class TeacherFactory{
    static create(overrides?: Partial<Teacher>): Teacher{
      return {
        id: 1,
        firstName: 'Master',
        lastName: 'Yoga',
        createdAt: new Date(),
        updatedAt: new Date(),
        ...overrides
      };
    }
};
