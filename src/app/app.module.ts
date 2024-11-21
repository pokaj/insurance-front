import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DataManagerComponent} from "./components/data-manager/data-manager.component";
import {FooterComponent} from "./components/footer/footer.component";
import {HeaderComponent} from "./components/header/header.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HomeComponent} from "./components/home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerComponent, NgxSpinnerModule} from "ngx-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatTableModule} from "@angular/material/table";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule} from "@angular/forms";
import {HttpInterceptor} from "./interceptors/http.interceptor";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOption} from "@angular/material/core";
import {DialogContentComponent} from "./components/dialog-content/dialog-content.component";
import {MatSelect} from "@angular/material/select";


@NgModule({
  declarations: [
    AppComponent,
    DataManagerComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    StatisticsComponent,
    HomeComponent,
    LoginComponent,
    DialogContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    NgxSpinnerComponent,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput,
    MatNativeDateModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatInput,
    FormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
