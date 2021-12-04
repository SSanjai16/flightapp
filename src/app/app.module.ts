import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
//import { CancellationComponent } from './cancellation/cancellation.component';
import { AppRoutingModule } from './app.routing-module';
import { Flight101Component } from './booking/flight101/flight101.component';
import { Flight102Component } from './booking/flight102/flight102.component';
import { BookticketsComponent } from './booking/booktickets/booktickets.component';
import { FormsModule } from '@angular/forms';
import { DropDownDirective } from './dropdown.directive';
import { SummaryComponent } from './summary/summary.component';
import { BookingService } from './booking/booking.service';
import { DataRequestService } from './data-request.service';
import { AddflightsComponent } from './addflights/addflights.component';
import { DeleteflightsComponent } from './deleteflights/deleteflights.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';  
import { EditflightsComponent } from './editflights/editflights.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthService } from './auth.service';
import { LogoutComponent } from './logout/logout.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { HistoryComponent } from './history/history.component';
import { SpinnerComponent } from './spinner/spinner.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { HighlightTablesearchPipe } from './highlight-tablesearch.pipe';
import { CitiesComponent } from './cities/cities.component';
import { FlightofcityComponent } from './flightofcity/flightofcity.component';
import { CitylistComponent } from './citylist/citylist.component';
import {MatListModule} from '@angular/material/list';
import { EditTheFlightComponent } from './edit-the-flight/edit-the-flight.component';
import { CitieslistComponent } from './citieslist/citieslist.component';
import { FlightformcityComponent } from './flightformcity/flightformcity.component';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookingComponent,
    //CancellationComponent,
    Flight101Component,
    Flight102Component,
    BookticketsComponent,
    DropDownDirective,
    SummaryComponent,
    AddflightsComponent,
    DeleteflightsComponent,
    EditflightsComponent,
    LoginComponent,
    RegistrationComponent,
    LogoutComponent,
    HistoryComponent,
    SpinnerComponent,
    ConfirmDialogComponent,
    HighlightTablesearchPipe,
    CitiesComponent,
    FlightofcityComponent,
    CitylistComponent,
    EditTheFlightComponent,
    CitieslistComponent,
    FlightformcityComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    MatListModule
  ],
  providers: [BookingService,DataRequestService,AuthService,{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  } ] ,
  bootstrap: [AppComponent],
  entryComponents: [DeleteflightsComponent,ConfirmDialogComponent]
})
export class AppModule { }
 