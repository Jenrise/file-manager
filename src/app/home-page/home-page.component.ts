import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material';
import {HttpService} from './service'
import {MatDialog} from '@angular/material/dialog';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

enum FileTypeEnum {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

export interface File  {
  name: string;
  parentFolderId?: number;
  fileTypeEnum: string;
  createdAt?: Date;
  updatedAt?: Date;
}

var requestObj =  {
  fileTypeEnum: FileTypeEnum.FILE,
  name: "",
  parentFolderId: null
}

export interface DialogData {
  newName: string;
  renameId: number;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})

export class HomePageComponent implements OnInit {
  
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = ['renameColumn', 'name', 'fileTypeEnum', 'parentFolder', 'id', 'actionsColumn'];
  dataSource = new MatTableDataSource()

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  newName: string;
  renameId: number;


  constructor(private httpService: HttpService, public dialog: MatDialog){}

  
  openDialog(id: number): void {
    const renameId = id;
    const dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '250px',
      data: {name: this.newName, id: this.renameId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newName = result;
      this.httpService.rename(result, renameId).subscribe(_ => {
        
      setTimeout(() =>
        this.httpService.addFiles()
          .subscribe(data => { 
            this.dataSource.data = data
          }), 500
      )
      })
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<File>();
    this.dataSource.paginator = this.paginator;
    this.httpService.addFiles()
      .subscribe(data => { 
        this.dataSource.data = data
      });
  }

  onFileSelect(event) {
    this.httpService.uploadFiles(event)
    setTimeout(() =>
      this.httpService.addFiles()
        .subscribe(data => { 
          this.dataSource.data = data
          }), 500
    )
    
  }

  Dialog() {
    this.httpService.createFolder()
    setTimeout(() =>
      this.httpService.addFiles()
        .subscribe(data => { 
          this.dataSource.data = data
          }), 6000
    )
  }

  deleteTicket(id: number, parentFolderId: string){
    this.httpService.remove(id).subscribe(_ => {
      if (parentFolderId == null ){
        this.httpService.addFiles()
        .subscribe(data => { 
          this.dataSource.data = data
          })
      } else {
        this.httpService.folderFiles(parentFolderId)
          .subscribe(data => {
            this.dataSource.data = data
          })
      }
      })
  }

  isFolder(fileTypeEnum: string, id: string) {
    if (fileTypeEnum === 'FOLDER') {
      this.httpService.folderFiles(id)
        .subscribe(data => {
          this.dataSource.data = data
        })
        requestObj.parentFolderId = id
    }
    this.httpService.changeParentFolderId(id)
  }

  Back() {
    this.httpService.addFiles()
      .subscribe(data => { 
        this.dataSource.data = data
      });
    this.httpService.noParentFolderId()
  }
 
}
