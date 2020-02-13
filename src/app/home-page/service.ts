import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NewFolderDialogComponent } from '../new-folder-dialog/new-folder-dialog.component';
import { MatDialog } from '@angular/material/dialog';

enum FileTypeEnum {
    FILE = 'FILE',
    FOLDER = 'FOLDER'
}
    
var requestObj =  {
    fileTypeEnum: FileTypeEnum.FILE,
    name: "",
    parentFolderId: null
}

const axios = require('axios');
  
export interface dialogData {
    folName: string;
}
   
@Injectable({providedIn: 'root'})
export class HttpService{


    private filesUrl = 'http://80.93.49.48:8592/file'
   
    constructor(private http: HttpClient, public dialog: MatDialog){ }
       
    addFiles() : Observable<File[]> {
        return this.http.get<File>(this.filesUrl)
        .pipe(map(data => {
          let item = data["data"]
          console.log(item)
          return item.map(function(file:any) {
              return {name: file.name, parentFolderId: file.parentFolderId, id: file.id, fileTypeEnum: file.fileTypeEnum}
          })
        }))
    }

    remove(id: number | string): Observable<void> {
        const url = `${this.filesUrl}/${id}`;
        return this.http.delete<void>(url).pipe(
            tap(_=> console.log(`Deleted file with id = ${id}`))
        )
    }

    rename(newName: string, id: string | number) {
        const url = `${this.filesUrl}/${id}`;
        return this.http.put(url, {name: newName}).pipe(
            tap(_=> console.log(`renamed file with id = ${id}`))
        )
    }

    folderFiles(id: string) : Observable<File[]> {
        const url = `${this.filesUrl}?parentFolderId=${id}`;
        return this.http.get<File>(url)
        .pipe(map(data => {
          let item = data["data"]
          return item.map(function(file:any) {
              return {name: file.name, parentFolderId: file.parentFolderId, id: file.id, fileTypeEnum: file.fileTypeEnum}
          })
        }))
    }

    changeParentFolderId (id: string) {
        requestObj.parentFolderId = id 
    }
    noParentFolderId () {
        requestObj.parentFolderId = null
    }

    uploadFiles(event) {
     
        const file = event.target.files[0]
        requestObj.name = file.name
        requestObj.fileTypeEnum = FileTypeEnum.FILE
        const json = JSON.stringify(requestObj);
        const blob = new Blob([json], {
        type: 'application/json'
        });
        const data = new FormData();
        data.append("requestObj", blob);
        data.append("multipartFile", file)
        axios.post('http://80.93.49.48:8592/file', data)
          .then(function (response) {
            console.log(response)
          })
     }

     folName: string
     
     createFolder(): void {
        const dialogRef = this.dialog.open(NewFolderDialogComponent, {
          width: '250px',
          data: {name: this.folName}
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.folName = result;
          requestObj.name = result
          requestObj.fileTypeEnum = FileTypeEnum.FOLDER
          console.log(requestObj.name)
          const json = JSON.stringify(requestObj);
          const blob = new Blob([json], {
          type: 'application/json'
          });
          const data = new FormData();
          data.append("requestObj", blob);
          axios.post('http://80.93.49.48:8592/file/', data)
            .then(function (response) {
              console.log(response)
            })
          
        });
      }
}