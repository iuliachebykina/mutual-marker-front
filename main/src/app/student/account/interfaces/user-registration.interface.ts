export interface IUser {
    email?: string;
    password?: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
    patronymic?: string;
    university?: string;
    institute?: string;
    studentGroup?: string;
    socialNetwork?: string;
    subject?: string;
    id?: string;
    username?: string;
    role?: string;
    name?: {
        firstName: string;
        lastName: string;
        patronymic: string;
    }
}