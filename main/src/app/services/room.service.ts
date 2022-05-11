import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RoomService {
    constructor(private _httpRequestService: HttpClient) { }

    /**
     * получение всех комнат
     * пагинация на бэке
     * @param page страница с которой начать показывать элементы
     * @param size кол-во элементов на каждой странице
     * @returns 
     */
    public getRooms(page: number, size: number): Observable<IBasicRoom> {
        return this._httpRequestService.get<IBasicRoom>('/api/rooms/rooms', { params: { page, size: 100 } });
    }

    /**
     * создание комнаты
     * @param title 
     * @param teacherId 
     * @returns 
     */
    public createRoom(title: string, teacherId: number): Observable<void> {
        return this._httpRequestService.post<void>('api/rooms/room', { title, teacherId });
    }

    /**
     * получение комнаты по айди
     * @param id айди комнаты
     * @returns 
     */
    public getRoomById(id: number): Observable<IBasicRoom> {
        return this._httpRequestService.get<IBasicRoom>(`api/rooms/room-by-id/${id}`);
    }

    /**
     * получение всех студентов комнаты
     * @param id айди комнаты
     * @returns 
     */
    public getStudentsByRoomId(id: number, page: number, size: number): Observable<any> {
        return this._httpRequestService.get<any>('/api/profile/room/students/' + id.toString(), { params: { page, size } });
    }

    /**
     * получение всех учителей по айди комнаты
     * @param id айди комнаты
     * @returns 
     */
    public getTeachersByRoomdId(id: number, page: number, size: number): Observable<any> {
        return this._httpRequestService.get<any>('/api/profile/room/teachers/' + id.toString(), { params: { page, size } });
    }

    /**
     * получение комнаты по коду
     * @param code 
     * @returns 
     */
    public getRoomByCode(code: string): Observable<IBasicRoom> {
        return this._httpRequestService.get<IBasicRoom>(`api/rooms/room/${code}`);
    }

    /**
     * получение всех заданий для комнаты
     * @returns 
     */
    public getRoomTasks(page: number, size: number, roomId: string): Observable<any> {
        return this._httpRequestService.get<any>('/api/task', { params: { page, size, room_id: roomId } });
    }

    /**
     * создание задания
     * @param task 
     * @returns 
     */
    public createTask(task: ITask): Observable<any> {
        return this._httpRequestService.post<any>('/api/task', task);
    }

    /**
     * присоединить студента (авторизованного на данный момент) к комнате по коду
     * @param roomCode 
     */
    public joinStudentToRoom(roomCode: string): Observable<IBasicRoom> {
        return this._httpRequestService.post<any>(`/api/rooms/student/${roomCode}`, {});
    }
}

export interface IBasicRoom {
    code: string,
    id: number,
    title: string
}

export interface ITask {
    "Название задания"?: string;
    "Описание задания"?: string;
    "Дата старта"?: Date;
    "Дедлайн"?: Date;
    "ИД комнаты"?: number;
    "Минимальное количество оценок"?: number;
    "Ступени оценивания"?: Array<{
        "Заголовок шага"?: string;
        "Описание шага"?: string;
        "Градация оценки"?: Array<number>
    }>;
    "Создатель"?: string;
}