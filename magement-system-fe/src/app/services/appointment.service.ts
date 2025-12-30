import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.model';
import { ServiceEndpointEnum } from '../enum/service-endpoint-enum';
import { Appointment } from '../models/appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {

  private baseUri = ServiceEndpointEnum.BASE_URL+ServiceEndpointEnum.APPOINTMENTS;
 ;

  constructor(private http: HttpClient) {}

   getAppointments(
    page: number,
    size: number,
    sortBy: string,
    sortDir: string
  ): Observable<any> {

    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    return this.http.get<any>(this.baseUri+ServiceEndpointEnum.FIND_ALL_APPOINTMENTS, { params });
  } 

  createAppointment(appointment: Appointment): Observable<any> {
    return this.http.post<any>(this.baseUri+ServiceEndpointEnum.CREATE_APPOINTMENT, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUri}${ServiceEndpointEnum.DELETE_APPOINTMENT}/${id}`);
  }
  updateAppointment(id:number,appointment: Appointment): Observable<any> {
    return this.http.patch<any>(`${this.baseUri}${ServiceEndpointEnum.UPDATE_APPOINTMENT}/${id}`, appointment);
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.baseUri}${ServiceEndpointEnum.GET_APPOINTMENT_BY_ID}/${id}`);
  }
}