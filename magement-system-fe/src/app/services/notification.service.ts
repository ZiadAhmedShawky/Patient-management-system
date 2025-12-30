import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.model';
import { ServiceEndpointEnum } from '../enum/service-endpoint-enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private baseUri = ServiceEndpointEnum.BASE_URL+ServiceEndpointEnum.NOTIFICATIONS;
 

  constructor(private http: HttpClient) {}

    sendNotification(patientId: number,appointmentId: number, message: string): Observable<any> {


    return this.http.post<any>(`${this.baseUri}/${patientId}/${appointmentId}/email`, { message });
  } 
}