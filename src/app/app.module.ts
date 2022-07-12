import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services/auth/auth.service';
import { BusyService } from './shared/services/busy/busy.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { AuthModule } from './components/auth/auth.module';
import { ComponentContainerDirective } from './shared/directives/component-container.directive';
import { UserinfoModule } from './components/userinfo/userinfo.module';
import { OverallModule } from './components/overall/overall.module';
import { MatNativeDateModule } from '@angular/material/core';
import { KataModule } from './components/kata/kata.module';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ComponentContainerDirective,
    ConfirmDialogComponent,
  ],
  imports: [
    DashboardModule,
    UserinfoModule,
    OverallModule,
    KataModule,
    MatNativeDateModule,
    AuthModule,
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [AuthService, BusyService],
  bootstrap: [AppComponent],
})
export class AppModule {}
