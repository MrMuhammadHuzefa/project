// import { Component, OnDestroy } from '@angular/core';

// import { Subscription } from 'rxjs';

// import { AuthService } from './core/auth/auth.service';
// import { RoleEnum } from './utils';


// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnDestroy {
//   title = 'client';
//   private sub?: Subscription;

//   constructor(public authService: AuthService) {
//   }

//   ngOnDestroy(): void {
//     this.sub?.unsubscribe();
//   }

//   public isPatient(): boolean {
//     return this.authService.getRole() === RoleEnum.PATIENT;
//   }

//   public isDoctor(): boolean {
//     return this.authService.getRole() === RoleEnum.DOCTOR;
//   }

//   public isAdmin(): boolean {
//     return this.authService.getRole() === RoleEnum.ADMIN;
//   }

//   public getUsername(): string {
//     return this.authService.getUsername();
//   }

//   public logoutUser(): void {
//     this.sub = this.authService.logout().subscribe(
//       (res: any) => this.authService.logoutUser(),
//       (err: any) => console.error(err)
//     );
//   }
// }


import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/auth/auth.service';
import { RoleEnum } from './utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'client';
  private sub?: Subscription;

  constructor(public authService: AuthService) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  isPatient(): boolean {
    return this.authService.getRole() === RoleEnum.PATIENT;
  }

  isDoctor(): boolean {
    return this.authService.getRole() === RoleEnum.DOCTOR;
  }

  isAdmin(): boolean {
    return this.authService.getRole() === RoleEnum.ADMIN;
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logoutUser(): void {
    this.sub = this.authService.logout().subscribe(
      (res: any) => this.authService.logoutUser(),
      (err: any) => console.error(err)
    );
  }
}