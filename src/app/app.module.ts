import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicComponent } from './basic/basic.component';
import { SendComponent } from './send/send.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from '@angular/material/input';
import {MatCommonModule} from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import {FormsModule} from "@angular/forms";
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    SendComponent,
    UsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatInputModule,
        MatCommonModule,
        MatSliderModule,
        FormsModule
    ],
  providers: [ BasicComponent, UsersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
