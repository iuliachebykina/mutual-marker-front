import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IUser } from "../student/account/interfaces/user-registration.interface";

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
    public getRooms(page: number, size: number): Observable<IBasicRoom[]> {
        return this._httpRequestService.get<IBasicRoom[]>('/api/rooms/rooms', { params: { page, size: 100 } });
    }

    public getRoomsWithoutGroup(page: number, size: number): Observable<IBasicRoom[]> {
        return this._httpRequestService.get<any>('api/rooms/rooms-without-group', { params: { page, size: 100 } })
    }

    public getGroups(page: number, size: number): Observable<IGroup[]> {
        return this._httpRequestService.get<any>('api/rooms/all-room-group', { params: { page, size: 100 } })
    }

    /**
     * создание комнаты
     * @param title 
     * @param teacherId 
     * @returns 
     */
    public createRoom(title: string, teacherId: number, description: string): Observable<void> {
        return this._httpRequestService.post<void>('api/rooms/room', { title, teacherId, description });
    }

    public createGroup(name: string): Observable<IGroup> {
        return this._httpRequestService.get<any>('api/rooms/create-room-group/' + name);
    }
    /**
     * получение комнаты по айди
     * @param id айди комнаты
     * @returns 
     */
    public getRoomById(id: number): Observable<IBasicRoom> {
        return this._httpRequestService.get<IBasicRoom>(`api/rooms/room-by-id/${id}`);
    }

    public putRoomsToGroup(roomId: string, roomGroupId: string): Observable<void> {
        return this._httpRequestService.post<any>('api/rooms/add-room-group', { roomId, roomGroupId })
    }
    /**
     * получение всех студентов комнаты
     * @param id айди комнаты
     * @returns 
     */
    public getStudentsByRoomId(id: number | string, page: number, size: number): Observable<IUser[]> {
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
     * создание задания
     * @param task 
     * @returns 
     */
    public createTask(task: ITaskRequest): Observable<ITaskRequest> {
        return this._httpRequestService.post<ITaskRequest>('/api/taskWithoutAttachments', task);
    }

    public getTasks(room_id: number): Observable<ITaskResponse[]> {
        return this._httpRequestService.get<ITaskResponse[]>('/api/task', { params: { page: 0, size: 1000, room_id } })
    }

    public getTaskById(task_id: string): Observable<ITaskResponse> {
        return this._httpRequestService.get<ITaskResponse>('/api/task/' + task_id);
    }

    public deleteTask(task_id: number): Observable<void> {
        return this._httpRequestService.delete<void>(`/api/task/${task_id}`);
    }

    /**
     * присоединить студента (авторизованного на данный момент) к комнате по коду
     * @param roomCode 
     */
    public joinStudentToRoom(roomCode: string): Observable<IBasicRoom> {
        return this._httpRequestService.post<any>(`/api/rooms/student/${roomCode}`, {});
    }

    public joinTeacherToRoom(roomCode: string): Observable<IBasicRoom> {
        return this._httpRequestService.post<any>(`/api/rooms/teacher/${roomCode}`, {});
    }

    public deleteRoom(code: string): Observable<void> {
        return this._httpRequestService.delete<any>('/api/rooms/room/' + code);
    }

    public leaveRoomAsStudent(roomId: string): Observable<void> {
        return this._httpRequestService.delete<any>('/api/rooms/room-by-student/' + roomId);
    }

    public deleteGroup(id: number): Observable<void> {
        return this._httpRequestService.delete<any>('api/rooms/delete-room-group/' + id);
    }
}

export interface IBasicRoom {
    code: string;
    id: number;
    title: string;
    description: string;
}

export interface ITaskRequest {
    title: string,
    description: string,
    openDate: string | Date,
    closeDate: string | Date,
    roomId: number,
    minNumberOfGraded: number,
    markSteps: [
        {
            title: string,
            values: any;
        }
    ],
    owner: string
}

export interface ITaskResponse {
    closeDate?: string;
    deleted?: boolean;
    description?: string;
    isBlock?: boolean;
    id?: number;
    openDate?: string;
    roomId?: number;
    minNumberOfGraded?: number;
    numberOfWorksLeftToGrade?: number;
    title?: string;
    markSteps?: Array<{
        deleted: boolean;
        description: string;
        id: number;
        title: string;
        values: number[];
    }>;
}

export interface IGroup {
    roomGroupId: 0,
    roomGroupName: string,
    rooms: [
        {
            id: 0,
            title: string,
            code: string,
            membersCount: 0,
            description: string
        }
    ]
};