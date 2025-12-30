import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '../services/appointment.service';
import { Appointment } from '../models/appointment.model';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { AuthService } from '../services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointments-management',
  templateUrl: './appointments-management.component.html',
  styleUrls: ['./appointments-management.component.css']
})
export class AppointmentsManagementComponent implements OnInit {

  roles: string[] = [];
  checkAuthority(): boolean {
    if (this.roles.includes('ADMIN')) {
      return true;
    }
    return false;
  }

  appointment:Appointment = {};
    data: any[] = [];
  totalElements = 0;

  pageSize = 5;
  searchTerm: string = '';
 displayedColumns: string[] = [
    'id',
    'appointmentDate',
    'reason',
    'status',
    'actions',
  ];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private appointmentService: AppointmentService,
    private auth: AuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.roles = this.auth.getUserRoles();
    this.getAppointments();
  }

  getAppointments(event?: PageEvent, sort?: Sort) {
    const page = event?.pageIndex ?? 0;
    const size = event?.pageSize ?? this.pageSize;
    const sortBy = sort?.active ?? 'id';
    const direction = sort?.direction?.toUpperCase() || 'ASC';

    this.appointmentService.getAppointments(page, size, sortBy, direction).subscribe(
      (res) => {
        console.log(res);
        this.data = res.content;
        this.totalElements = res.totalElements;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );

}
  cancel() {
    this.router.navigate(['/patients']);
  }

  deleteAppointment(id: number) {
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
         width: '400px',
         data: {
           title: 'Confirm submission',
           message:'Are you sure you want to delete this Appointment?',
         },
       });
   
       dialogRef.afterClosed().subscribe((confirmed: boolean) => {
         if (!confirmed) return;
   
         this.appointmentService.deleteAppointment(id).subscribe(() => {
           this.getAppointments();
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



}
