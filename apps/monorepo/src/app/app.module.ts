import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Ensure you import your routing module

@NgModule({
  declarations: [
    AppComponent,
    // No need to declare LoginComponent and RegistrationComponent here
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule, // Include ReactiveFormsModule here
    AppRoutingModule // Use the AppRoutingModule for routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
