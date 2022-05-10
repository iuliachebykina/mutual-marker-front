import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RoomService {
    constructor(private _httpRequestService: HttpClient) { }

    public getRooms(page: number, size: number): Observable<IBasicRoom> {
        return this._httpRequestService.get<IBasicRoom>('/api/rooms/rooms', { params: { page, size: 100 } });
    }

    public createRoom(title: string, teacherId: number): Observable<any> {
        return this._httpRequestService.post<any>('api/rooms/room', { title, teacherId });
    }

    public getRoomById(id: number): Observable<any> {
        return this._httpRequestService.get<any>(`api/rooms/room/${id}`);
    }

    public getRoomByCode(code: string): Observable<any> {
        return this._httpRequestService.get<any>(`api/rooms/room/${code}`);
    }
}

export interface IBasicRoom {
    code: string,
    id: number,
    title: string
}