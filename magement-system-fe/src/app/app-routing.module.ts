import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PatientsComponent } from './patients/patients.component';
import { PatientRegisterationComponent } from './patient-registeration/patient-registeration.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { AppointmentRegisterationComponent } from './appointment-registeration/appointment-registeration.component';
import { AppointmentsManagementComponent } from './appointments-management/appointments-management.component';
import { RegisterationComponent } from './registeration/registeration.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registeration', component: RegisterationComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN'] } },
  {path: 'patients', component:PatientsComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'createPatient', component: PatientRegisterationComponent ,canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN','USER'] }},
  {path: 'createAppointment', component:AppointmentRegisterationComponent ,canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN','USER'] }},
  { path: 'appointments', component: AppointmentsManagementComponent, canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN','USER'] } },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
