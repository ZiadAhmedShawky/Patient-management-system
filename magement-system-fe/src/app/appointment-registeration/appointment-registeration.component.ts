import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '../models/appointment.model';
import { AppointmentService } from '../services/appointment.service';
import { PatientsService } from '../services/patient.service';
import { NotificationService } from '../services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-appointment-registeration',
  templateUrl: './appointment-registeration.component.html',
  styleUrls: ['./appointment-registeration.component.css'],
})
export class AppointmentRegisterationComponent implements OnInit {
  mode: number = 0;
  patientId: number = 0;
  appointment: Appointment = {};
  data: Appointment[] = [];
  id: number = 0;
  displayedColumns: string[] = [
    'id',
    'appointmentDate',
    'status',
    'reason',
    'actions',
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private patientService: PatientsService,
    private notificationService: NotificationService,
    private dialog: MatDialog,private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.mode = +params['mode'];
      this.id = +params['id'];
      this.patientId =params['patientId'];




       if (this.mode == 1&& this.auth.getUserRoles().includes('ADMIN')) {
        this.appointmentService.getAppointmentById(this.id).subscribe((res) => {
          this.appointment = res;
          this.patientId = this.appointment.patientId!;
          this.appointment.appointmentDate =
            this.appointment.appointmentDate == null
              ? ''
              : this.appointment.appointmentDate.slice(0, 16);

          this.loadData();
        });
      }else if(this.mode==2){
        this.loadData();
      }else{
        this.loadData();
      }
    });
  }

  loadData() {
    this.patientService.getAppointmentsByPatientId(this.patientId).subscribe(
      (res) => {
        this.data = res;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }
  save() {
    this.appointmentService.createAppointment(this.appointment).subscribe(
      () => {
        this.router.navigate(['/appointments']);
      },
      (error) => {
        console.error('Error creating appointment:', error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/appointments']);
  }
  deleteAppointment(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm submission',
        message: 'Are you sure you want to delete this Appointment?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.loadData();
      });
    });
  }

  updateAppointment(id: number) {
    this.router.navigate(['/createAppointment'], {
      queryParams: {
        mode: 1,
        id: id,
      },
    });
  }

  sendNotification(appointmentId: number) {
    this.notificationService
      .sendNotification(
        this.patientId,
        appointmentId,
        'Your appointment has been scheduled.'
      )
      .subscribe(() => {
        console.log('Notification sent successfully');
      });
  }
}
