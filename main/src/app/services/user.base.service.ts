import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { IUser } from "../student/account/interfaces/user-registration.interface";

@Injectable()
export class UserBaseService {

    private _getUser$: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    constructor(
        private _httpRequestService: HttpClient
    ) { }

    /**
     * метод для регистрации пользователя в системе
     * @param user данные юзера
     * @returns юзера при успешной регистрации
     */
    public registerStudent(user: IUser): Observable<IUser> {
        return this._httpRequestService.post<IUser>('/api/registration/student', user)
            .pipe(
                tap(data => this.setUser(data))
            )
    }

    /**
     * метод для регистрации пользователя в системе
     * @param user данные юзера
     * @returns юзера при успешной регистрации
     */
     public registerTeacher(user: IUser): Observable<IUser> {
        return this._httpRequestService.post<IUser>('/api/registration/teacher', user)
            .pipe(
                tap(data => this.setUser(data))
            )
    }

    /**
     * метод для логина. запрашиваем всех пользователей и ищем совпадение
     * при успешном поиске сохраняем юзера и авторизовываем в системе
     * @param user
     * @returns результат поиска в булевом представлении
     */
    public login(user: IUser, role: string): Observable<IUser> {
        const formData: FormData = new FormData();
        formData.append("username", role);
        formData.append("password", user.password);

        return this._httpRequestService.post<IUser>('http://mutual-marker-back:8090/api/login', formData)
            .pipe(
                map((data: IUser): any => {
                    if (data) {
                        this.setUser(data);

                        return data;
                    }
                })
            )
    }

    public setUser(user: IUser): void {
        this._getUser$.next(user);
    }

    public getUser(): Observable<IUser> {
        return this._getUser$;
    }

    public logout(): void {
        this._httpRequestService.get<IUser>(`/api/logout`).subscribe();
    }

    public updateProfileInfo(user: IUser): Observable<any> {
        return this._httpRequestService.patch<any>('/api/profile/self', user);
    }

    public getStudentById(id: string): Observable<any> {
        return this._httpRequestService.get<any>('/api/profile/student-by-id/' + id);
    }
}