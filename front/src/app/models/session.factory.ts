import { SessionInformation } from "../interfaces/sessionInformation.interface";

export class SessionInformationFactory{
    static create(overrides?: Partial<SessionInformation>): SessionInformation{
      return {
        id: 1,
        username: 'Yoga Master',
        firstName: 'Master',
        lastName: 'Yoga',
        admin: true,
        token: 'token',
        type: 'type',
        ...overrides
      };
    }
};
