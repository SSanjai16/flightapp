import { NgModule } from "@angular/core";
import { RouterModule,Routes } from "@angular/router";
import { AddflightsComponent } from "./addflights/addflights.component";
import { AuthguardService } from "./authguard.service";
import { BookingComponent } from "./booking/booking.component";
import { BookticketsComponent } from "./booking/booktickets/booktickets.component";
import { Flight101Component } from "./booking/flight101/flight101.component";
import { Flight102Component } from "./booking/flight102/flight102.component";
import { CitiesComponent } from "./cities/cities.component";
import { DeleteflightsComponent } from "./deleteflights/deleteflights.component";
import { EditTheFlightComponent } from "./edit-the-flight/edit-the-flight.component";
import { EditflightsComponent } from "./editflights/editflights.component";
import { HistoryComponent } from "./history/history.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
//import { CancellationComponent } from "./cancellation/cancellation.component";
import { SummaryComponent } from "./summary/summary.component";
import { UsersComponent } from "./users/users.component";
const appRoutes: Routes=[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'booking',component:BookingComponent,canActivate:[AuthguardService],children:[
        {path:'flight-101',component:Flight101Component},
        {path:'flight-102',component:Flight102Component},
      
               
    ]},
    //{path:'cancellation',component:CancellationComponent},
    {path:'booking/:flightnum',component:BookticketsComponent,canActivate:[AuthguardService]},
    {path:'editflight/:flightnum',component:EditTheFlightComponent,canActivate:[AuthguardService]},
    {path:'login',UsersComponentt:LoginComponent,},
    {path:'register',component:RegistrationComponent},
    {path:'logout',component:LogoutComponent},
    {path:'cities',component:CitiesComponent,canActivate:[AuthguardService]},
    {path:'addflight',component:AddflightsComponent,canActivate:[AuthguardService]},
    {path:'deleteflight',component : DeleteflightsComponent,canActivate:[AuthguardService]},
    {path:'editflight',component:EditflightsComponent,canActivate:[AuthguardService]},
    {path:'summary',component:SummaryComponent},
    {path:'users',component:UsersComponent},
    {path:'history',component:HistoryComponent}
];
@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{useHash:true})],
    exports:[RouterModule]
})

export class AppRoutingModule
{

}