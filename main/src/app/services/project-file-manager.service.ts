import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProjectFileManagerService {
    constructor(private _httpRequestService: HttpClient) { }

    /**
     * метод для загрузки файла
     * если проект (работа студента) еще не была загружена то сначала вызываем этот метод
     * а затем создаем проект
     * @param fileToUpload файл
     * @returns наименования файла на бэке
     */
    public uploadStudentWork(fileToUpload: File): Observable<string[]> {
        const formData: FormData = new FormData();
        formData.append('attachments', fileToUpload, fileToUpload.name);

        return this._httpRequestService.post<string[]>('/api/attachments/upload', formData);
    }

    public createProject(taskId: string, file: string[], data?: IWork): Observable<void> {
        if (!data) {
            data = {
                title: 'Работа студента',
                description: 'Работа студента',
                attachments: file
            }
        };

        return this._httpRequestService.post<void>(`/api/task/${taskId}/project`, data);
    }

    public getSelfProjectByTaskId(taskId: string): Observable<IAttachment[]> {
        return this._httpRequestService.get<IAttachment[]>(`/api/task/${taskId}/project/self`)
            .pipe(
                map(attachment => Array.isArray(attachment) ? attachment : [attachment])
            );
    }

    public getAnotherStudentProject(projectId: string | number, task_id: number): Observable<IAttachment[]> {
        return this._httpRequestService.get<IAttachment[]>(`/api/task/project/${projectId}`)
            .pipe(
                map(attachment => Array.isArray(attachment) ? attachment : [attachment]),
                map(att => {
                    att[0].taskId = task_id;

                    return att;
                })
            );
    }

    public openFile(filename: string): Observable<any> {
        return this._httpRequestService.get('/api/attachments/open', { params: { filename }, responseType: 'blob' });
    }

    /**
     * Рандомный еще не оцененный текущим пользователем проект
     * @param task_id айди задания
     * @returns 
     */
    public getRandomProject(task_id: number): Observable<[number, number]> {
        return this._httpRequestService.get<any>(`/api/task/${task_id}/project/random`)
            .pipe(
                map(response => [response, task_id])
            );
    }

    public getProjectById(projectId: string): Observable<any> {
        return this._httpRequestService.get<any>(`/api/task/project-for-teacher/` + projectId)
            .pipe(
                map(response => response)
            );
    }

    public updateProject(project: IAttachment): any {
        return this._httpRequestService.put<any>(`/api/task/${project.id}/project/self`, project)
            .pipe(
                map(response => response)
            );
    }

    public getProjectsByTask(task_id: number): Observable<any> {
        return this._httpRequestService.get<any>('/api/task/' + task_id + '/projects')
            .pipe(
                map(i => {
                    let item = i;
                    item.forEach((elem, index) => {
                        item[index].finalMark = elem.finalMark === "NaN" ? 0 : parseInt(elem.finalMark);
                    })

                    return item;
                })
            );
    }

    public deleteAttachment(projectId: number, fileName: string): Observable<void> {
        return this._httpRequestService.delete<any>('/api/project/' + projectId + '/attachments/' + fileName);
    }

    public excelStatistic(id: number): Observable<any> {
        return this._httpRequestService.get('/api/statistics/excel', { responseType: 'blob', params: { taskId: id } });
    }

    public excelStatistic2(id: number): Observable<any> {
        return this._httpRequestService.get('/api/statistics/excelProject', { responseType: 'blob', params: { projectId: id } });
    }
}

export interface IAttachment {
    attachments?: string[],
    title?: string,
    description?: string,
    id?: number;
    grade?: any;
    taskId?: number;
}

export interface IWork {
    title: string,
    description: string,
    attachments: any
}