export enum ServiceEndpointEnum {
    BASE_URL='http://localhost:8080/',
    
    /* PATIENT */
    PATIENTS= 'patient',
    CREATE_PATIENT= '/save',
    FIND_ALL_PATIENTS= '/findAll',
    UPDATE_PATIENT= '/update',
    GET_PATIENT_BY_ID= '/getById',
    DELETE_PATIENT= '/delete',

    /* APPOINTMENT */
    
    APPOINTMENTS= 'appointment',
    CREATE_APPOINTMENT= '/save',
    FIND_ALL_APPOINTMENTS= '/findAll',
    UPDATE_APPOINTMENT= '/update',
    GET_APPOINTMENT_BY_ID= '/getById',
    DELETE_APPOINTMENT= '/delete',


    NOTIFICATIONS= 'notification',
}