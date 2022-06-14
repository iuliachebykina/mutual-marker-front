import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { IAttachment } from "./project-file-manager.service";

@Injectable()
export class MarksService {
    constructor(private _httpRequestService: HttpClient) { }


    /**
     * получение задания оценки проекта
     * @param projectId айди проекта
     * @returns 
     */
    public getProjectMark(projectId: number): Observable<IMark[]> {
        return this._httpRequestService.get<any>('/api/marks/' + projectId);
    }

    /**
     * оценка работы
     * @param projectId айди проекта
     * @param profileId айди оцениваемого
     * @param markStepValues оценка
     * @returns 
     */
    public setWorkMark(projectId: string, profileId: string, markStepValues: number[]): Observable<any> {
        return this._httpRequestService.post<any>('/api/marks/mark', { projectId, profileId, markStepValues, comment: '' })
    }

    public getAllMarksByTaskId(taskId: number | string): Observable<IStatistic[]> {
        return this._httpRequestService.get<any>(`/api/marks/task/${taskId}`)
            .pipe(
                catchError((error: any) => {
                    return of(null);
                })
            );
    }
}

export interface IMark {
    comment: string,
    id: number,
    markValue: number
}

export interface IStatistic {
    group: string;
    finalMark: number;
    profileId: number;
    projectId: number;
    projectTitle: string;
    studentName: {
        firstName: string;
        lastName: string;
        patronymic: string;
    };
}