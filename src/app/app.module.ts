import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksTableComponent } from './tasks/tasks-table/tasks-table.component';
import { MainPageComponent } from './tasks/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksTableComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
