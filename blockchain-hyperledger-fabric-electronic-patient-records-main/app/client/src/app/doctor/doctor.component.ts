// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';

// import { Observable, Subscription } from 'rxjs';

// import { RoleEnum } from '../utils';
// import { AuthService } from '../core/auth/auth.service';

// import { DoctorViewRecord } from './doctor';
// import { DoctorService } from './doctor.service';


// @Component({
//   selector: 'app-doctor',
//   templateUrl: './doctor.component.html',
//   styleUrls: ['./doctor.component.scss']
// })
// export class DoctorComponent implements OnInit, OnDestroy {
//   public doctorId: any;
//   public doctorRecordObs?: Observable<DoctorViewRecord>;
//   private sub?: Subscription;

//   constructor(
//     private readonly route: ActivatedRoute,
//     private readonly doctorService: DoctorService,
//     private readonly authService: AuthService
//   ) { }

//   ngOnInit(): void {
//     this.sub = this.route.params
//       .subscribe((params: Params) => {
//         this.doctorId = params.doctorId;
//         this.refresh();
//       });
//   }

//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//   }

//   public refresh(): void {
//     this.doctorRecordObs = this.doctorService.getDoctorByHospitalId(this.authService.getHospitalId(), this.doctorId);
//   }

//   public isDoctor(): boolean {
//     return this.authService.getRole() === RoleEnum.DOCTOR;
//   }
// }


import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DoctorService } from './doctor.service';
import { DoctorViewRecord } from './doctor';
import { AuthService } from '../core/auth/auth.service';
import { RoleEnum } from '../utils';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit, OnDestroy {
  public doctorId: any;
  public doctorRecordObs?: Observable<DoctorViewRecord | null>;
  public loading = true;
  public error: string | null = null;
  private sub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly doctorService: DoctorService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe({
      next: (params) => {
        this.doctorId = params['doctorId'];
        this.loadDoctorData();
      },
      error: (err) => {
        this.handleError('Failed to load doctor parameters');
      }
    });
  }

  private loadDoctorData(): void {
    this.loading = true;
    this.error = null;
    
    this.doctorRecordObs = this.doctorService.getDoctorByHospitalId(
      this.authService.getHospitalId(), 
      this.doctorId
    ).pipe(
      catchError(err => {
        this.handleError('Failed to load doctor data');
        return of(null);
      }),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  private handleError(message: string): void {
    this.error = message;
    this.loading = false;
    console.error(message);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refresh(): void {
    this.loadDoctorData();
  }

  public isDoctor(): boolean {
    return this.authService.getRole() === RoleEnum.DOCTOR;
  }
}