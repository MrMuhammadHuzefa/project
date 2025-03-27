// // // import { Component, OnDestroy, OnInit } from '@angular/core';
// // // import { ActivatedRoute, Params } from '@angular/router';

// // // import { Observable, Subscription } from 'rxjs';

// // // import { PatientService } from './patient.service';
// // // import { PatientViewRecord } from './patient';
// // // import { AuthService } from '../core/auth/auth.service';
// // // import { RoleEnum } from '../utils';


// // // @Component({
// // //   selector: 'app-patient',
// // //   templateUrl: './patient.component.html',
// // //   styleUrls: ['./patient.component.scss']
// // // })
// // // export class PatientComponent implements OnInit, OnDestroy {
// // //   public patientID: any;
// // //   public patientRecordObs?: Observable<PatientViewRecord>;
// // //   private sub?: Subscription;

// // //   constructor(
// // //     private readonly route: ActivatedRoute,
// // //     private readonly patientService: PatientService,
// // //     private readonly authService: AuthService
// // //   ) { }

// // //   ngOnInit(): void {
// // //     this.sub = this.route.params
// // //       .subscribe((params: Params) => {
// // //         this.patientID = params.patientId;
// // //         this.refresh();
// // //       });
// // //   }

// // //   ngOnDestroy(): void {
// // //     this.sub?.unsubscribe();
// // //   }

// // //   public refresh(): void {
// // //     this.patientRecordObs = this.patientService.getPatientByKey(this.patientID);
// // //   }

// // //   public isPatient(): boolean {
// // //     return this.authService.getRole() === RoleEnum.PATIENT;
// // //   }

// // //   public isDoctor(): boolean {
// // //     return this.authService.getRole() === RoleEnum.DOCTOR;
// // //   }
// // // }

// // import { Component, OnDestroy, OnInit } from '@angular/core';
// // import { ActivatedRoute, Params } from '@angular/router';
// // import { Observable, Subscription } from 'rxjs';
// // import { PatientService } from './patient.service';
// // import { PatientViewRecord } from './patient';
// // import { AuthService } from '../core/auth/auth.service';
// // import { RoleEnum } from '../utils';

// // @Component({
// //   selector: 'app-patient',
// //   templateUrl: './patient.component.html',
// //   styleUrls: ['./patient.component.scss']
// // })
// // export class PatientComponent implements OnInit, OnDestroy {
// //   public patientID: any;
// //   public patientRecordObs?: Observable<PatientViewRecord>;
// //   public isLoading: boolean = false; // New loading state
// //   public errorMessage: string | null = null; // New error handling
// //   private sub?: Subscription;

// //   constructor(
// //     private readonly route: ActivatedRoute,
// //     private readonly patientService: PatientService,
// //     private readonly authService: AuthService
// //   ) { }

// //   ngOnInit(): void {
// //     this.loadPatientData();
// //   }

// //   ngOnDestroy(): void {
// //     this.sub?.unsubscribe();
// //   }

// //   public refresh(): void {
// //     this.loadPatientData();
// //   }

// //   private loadPatientData(): void {
// //     this.isLoading = true;
// //     this.errorMessage = null;
    
// //     this.sub = this.route.params.subscribe({
// //       next: (params: Params) => {
// //         this.patientID = params.patientId;
// //         this.patientRecordObs = this.patientService.getPatientByKey(this.patientID);
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         this.errorMessage = 'Failed to load patient data';
// //         this.isLoading = false;
// //         console.error(err);
// //       }
// //     });
// //   }

// //   public isPatient(): boolean {
// //     return this.authService.getRole() === RoleEnum.PATIENT;
// //   }

// //   public isDoctor(): boolean {
// //     return this.authService.getRole() === RoleEnum.DOCTOR;
// //   }
// // }



// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Observable, Subscription, of } from 'rxjs';
// import { catchError, finalize } from 'rxjs/operators';
// import { PatientService } from './patient.service';
// import { PatientViewRecord } from './patient';
// import { AuthService } from '../core/auth/auth.service';
// import { RoleEnum } from '../utils';

// @Component({
//   selector: 'app-patient',
//   templateUrl: './patient.component.html',
//   styleUrls: ['./patient.component.scss']
// })
// export class PatientComponent implements OnInit, OnDestroy {
//   public patientID: any;
//   public patientRecordObs?: Observable<PatientViewRecord | null>;
//   public loading = true;
//   public error: string | null = null;
//   private sub?: Subscription;

//   constructor(
//     private readonly route: ActivatedRoute,
//     private readonly patientService: PatientService,
//     private readonly authService: AuthService
//   ) { }

//   ngOnInit(): void {
//     this.sub = this.route.params.subscribe({
//       next: (params) => {
//         this.patientID = params['patientId'];
//         this.loadPatientData();
//       },
//       error: (err) => {
//         this.handleError('Failed to load patient parameters');
//       }
//     });
//   }

//   private loadPatientData(): void {
//     this.loading = true;
//     this.error = null;
    
//     this.patientRecordObs = this.patientService.getPatientByKey(this.patientID).pipe(
//       catchError(err => {
//         this.handleError('Failed to load patient data');
//         return of(null); // Return null to keep observable alive
//       }),
//       finalize(() => {
//         this.loading = false;
//       })
//     );
//   }

//   private handleError(message: string): void {
//     this.error = message;
//     this.loading = false;
//     console.error(message);
//   }

//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//   }

//   public refresh(): void {
//     this.loadPatientData();
//   }

//   public isPatient(): boolean {
//     return this.authService.getRole() === RoleEnum.PATIENT;
//   }

//   public isDoctor(): boolean {
//     return this.authService.getRole() === RoleEnum.DOCTOR;
//   }
// }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { PatientService } from './patient.service';
import { PatientViewRecord } from './patient';
import { AuthService } from '../core/auth/auth.service';
import { RoleEnum } from '../utils';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit, OnDestroy {
  public patientID: any;
  public patientRecordObs?: Observable<PatientViewRecord | null>;
  public loading = true;
  public error: string | null = null;
  private sub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly patientService: PatientService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe({
      next: (params) => {
        this.patientID = params['patientId'];
        this.loadPatientData();
      },
      error: (err) => {
        this.handleError('Failed to load patient parameters');
      }
    });
  }

  private loadPatientData(): void {
    this.loading = true;
    this.error = null;
    
    this.patientRecordObs = this.patientService.getPatientByKey(this.patientID).pipe(
      catchError(err => {
        this.handleError('Failed to load patient data');
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
    this.loadPatientData();
  }

  public isPatient(): boolean {
    return this.authService.getRole() === RoleEnum.PATIENT;
  }

  public isDoctor(): boolean {
    return this.authService.getRole() === RoleEnum.DOCTOR;
  }
}