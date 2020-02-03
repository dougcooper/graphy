import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { GraphyFormComponent } from './graphy-form/graphy-form.component';
import { GraphyGraphComponent } from './graphy-graph/graphy-graph.component';
import { BinarySortedTree } from './models/binary-sorted-tree-model/binary-sorted-tree';
import { TreeService } from './tree-service/tree.service';
import { ReactiveFormsModule } from '@angular/forms';


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
    ReactiveFormsModule
  ],
  providers: [TreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
