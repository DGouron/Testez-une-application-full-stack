import { Session } from "../interfaces/session.interface";

export class SessionFactory {
    static create(overrides? : Partial<Session>): Session {
        return {
            id: 1,
            name: 'Yoga',
            description: 'Yoga session',
            date: new Date(),
            teacher_id: 1,
            users: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            ...overrides
        };
    }
}