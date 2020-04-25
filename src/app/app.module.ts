import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { GraphyFormComponent } from './graphy-form/graphy-form.component';
import { GraphyGraphComponent } from './graphy-graph/graphy-graph.component';
import { TreeService } from './tree-service/tree.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    GraphyFormComponent,
    GraphyGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxGraphModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    // MenuController
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
