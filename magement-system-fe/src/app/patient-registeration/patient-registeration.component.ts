import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/Patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientsService } from '../services/patient.service';
import { AuthService } from '../services/auth.service';
import { log } from 'console';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-registeration',
  templateUrl: './patient-registeration.component.html',
  styleUrls: ['./patient-registeration.component.css'],
})
export class PatientRegisterationComponent implements OnInit {
  patient: Patient = {} as any;
  roles: string[] = [];
  id: number = 0;
  mode: number = 0;
  constructor(
    private patientService: PatientsService,
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mode = params['mode'];
      this.id = params['id'];
      this.roles = this.auth.getUserRoles();
      if (this.mode == 1  || this.mode == 2) {
        this.patientService.getPatientById(this.id).subscribe((res) => {
          this.patient = res;
          this.patient.dateOfBirth = this.patient.dateOfBirth.split('T')[0];
        });
      }
    });
  }

  cancel() {
    this.router.navigate(['/patients']);
  }
  save() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm submission',
        message:
          this.mode == 1
            ? 'Are you sure you want to update this patient?'
            : 'Are you sure you want to create this patient?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      if (this.mode == 1) {
        this.updatePatient();
      } else {
        // CREATE
        this.createPatient();
      }
    });
  }

  private createPatient(): void {
    this.patientService.createPatient(this.patient).subscribe({
      next: (res) => {
        console.log('Patient created successfully', res);
        this.router.navigate(['/patients']);
      },
      error: (err) => console.error('Create failed', err),
    });
  }

  private updatePatient() {
    this.patientService.updatePatient(this.id, this.patient).subscribe(
      (res) => {
        this.router.navigate(['/patients']);
      },
      (err) => console.error('Update failed', err)
    );
  }
}
