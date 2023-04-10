import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";

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
    public setWorkMark(projectId: string, profileId: string, markStepFeedbackDtos: IMarkStepValue[]): Observable<any> {
        return this._httpRequestService.post<any>('/api/marks/mark', { projectId, profileId, markStepFeedbackDtos })
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
    comment: string;
    id: number;
    markValue: number;
    project: {
        id: number;
    }
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

export interface IMarkStepValue {
    value: number;
    comment: string;
    markStepId: number;
    reviewerId: number;
}