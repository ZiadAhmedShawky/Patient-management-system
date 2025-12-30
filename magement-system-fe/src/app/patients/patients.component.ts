import { Component, OnInit } from '@angular/core';
import { PatientsService } from '../services/patient.service';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { AuthService } from '../services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  constructor(
    private patientService: PatientsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private dialog: MatDialog
  ) {}

  roles: string[] = [];
  ngOnInit(): void {
    this.loadData();
    this.roles = this.auth.getUserRoles();
  }

  data: any[] = [];
  totalElements = 0;

  pageSize = 5;
  mode: number = 0;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'phone',
    'actions',
  ];
  searchTerm: string = '';
  loadData(event?: PageEvent, sort?: Sort) {
    const page = event?.pageIndex ?? 0;
    const size = event?.pageSize ?? this.pageSize;
    const sortBy = sort?.active ?? 'id';
    const direction = sort?.direction?.toUpperCase() || 'ASC';

    this.patientService
      .getPatients(page, size, sortBy, direction)
      .subscribe((res) => {
        this.data = res.content;
        this.totalElements = res.totalElements;
      });
  }

  
/*   applySearch() {
      const criteria = { firstName: this.searchTerm, lastName: '' }; // or two inputs

    this.patientService
      .search(criteria)
      .subscribe((res) => {
        console.log(res);
        
        this.data = res.content;
        this.totalElements = res.totalElements;
      });
  }

  clearSearch() {
    this.searchTerm = '';
    this.loadData();
  } */

  updatePatient(id: number) {
    this.router.navigate(['/createPatient'], {
      queryParams: {
        mode: 1,
        id: id,
      },
    });
  }
  getPatientById(id: number) {
    this.router.navigate(['/createPatient'], {
      queryParams: {
        mode: 2,
        id: id,
      },
    });
  }
  deletePatient(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm submission',
        message:'Are you sure you want to delete this patient?',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;

      this.patientService.deletePatient(id).subscribe(() => {
        this.loadData();
      });
    });
  }
  goToCreatePatient() {
    this.router.navigate(['/createPatient']);
  }

  goToAppointments(id: number) {
    this.mode= this.roles.includes('ADMIN') ? 0 : 2;
    this.router.navigate(['/createAppointment'], {

      queryParams: {
        patientId: id,
        mode: this.mode,
      },
    });
  }

  navigateToRegisteration() {
    this.router.navigate(['/registeration']);
  }

  checkAuthority(): boolean {
    if (this.roles.includes('ADMIN')) {
      return true;
    }
    return false;
  }


}
