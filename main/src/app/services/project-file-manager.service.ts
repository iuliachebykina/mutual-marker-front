import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";

@Injectable()
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
        formData.append('files', fileToUpload, fileToUpload.name);

        return this._httpRequestService.post<string[]>('/api/attachments/upload', formData);
    }

    public createProject(taskId: string, file: string[]): Observable<void> {
        return this._httpRequestService.post<void>(`/api/task/${taskId}/project`, {
            title: 'Работа студента',
            description: 'Работа студента',
            attachments: file
        });
    }

    public getSelfProjectByTaskId(taskId: string): Observable<IAttachment[]> {
        return this._httpRequestService.get<IAttachment[]>(`/api/task/${taskId}/project/self`)
            .pipe(
                map(attachment => Array.isArray(attachment) ? attachment : [attachment])
            );
    }

    public openFile(filename: string): Observable<any> {
        return this._httpRequestService.get('/api/attachments/open', { params: { filename }, responseType: 'blob' });
    }
}

export interface IAttachment {
    attachments?: string[],
    title?: string,
    description?: string,
    id?: number;
}