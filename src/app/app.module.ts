import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RoutesModule } from './routes/routes/routes.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyButtonComponent } from './components/my-button/my-button.component';
import { MaterialButtonComponent } from './components/material-button/material-button.component';
import { MaterialCheckboxComponent } from './components/material-checkbox/material-checkbox.component';

@NgModule({
  declarations: [AppComponent, MyButtonComponent, MaterialButtonComponent, MaterialCheckboxComponent],
  imports: [BrowserModule, FormsModule, RoutesModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
