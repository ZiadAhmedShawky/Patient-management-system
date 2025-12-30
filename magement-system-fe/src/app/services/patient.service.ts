import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/Patient.model';
import { ServiceEndpointEnum } from '../enum/service-endpoint-enum';

@Injectable({ providedIn: 'root' })
export class PatientsService {

  private baseUri = ServiceEndpointEnum.BASE_URL+ServiceEndpointEnum.PATIENTS;
 ;

  constructor(private http: HttpClient) {}

  getPatients(
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

    return this.http.get<any>(this.baseUri+ServiceEndpointEnum.FIND_ALL_PATIENTS, { params });
  }

  createPatient(patient: Patient): Observable<any> {
    return this.http.post<any>(this.baseUri+ServiceEndpointEnum.CREATE_PATIENT, patient);
  }
  updatePatient(id:number,patient: Patient): Observable<any> {
    return this.http.patch<any>(`${this.baseUri}${ServiceEndpointEnum.UPDATE_PATIENT}/${id}`, patient);
  }
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUri}${ServiceEndpointEnum.GET_PATIENT_BY_ID}/${id}`);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUri}${ServiceEndpointEnum.DELETE_PATIENT}/${id}`);
  }

  getAppointmentsByPatientId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUri}/${id}/appointments`);
  }

  search(searchCriteria: any): Observable<any> {
    const params = new HttpParams()
      .set('firstName', searchCriteria.firstName)
      .set('lastName', searchCriteria.lastName);
    
    return this.http.get(`${this.baseUri}/search`, { params });
  }
}