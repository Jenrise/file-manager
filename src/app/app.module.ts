import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule,MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DialogOverviewComponent } from './dialog-overview/dialog-overview.component';
import { NewFolderDialogComponent } from './new-folder-dialog/new-folder-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    DialogOverviewComponent,
    NewFolderDialogComponent,
  ],
  entryComponents: [DialogOverviewComponent, NewFolderDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    FileUploadModule,
    HttpClientModule,
    MatDialogModule 
  ],
  exports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    DialogOverviewComponent,
    NewFolderDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
