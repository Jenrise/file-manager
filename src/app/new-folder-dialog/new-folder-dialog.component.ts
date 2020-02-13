import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { dialogData } from '../home-page/service';

@Component({
  selector: 'app-new-folder-dialog',
  templateUrl: './new-folder-dialog.component.html',
  styleUrls: ['./new-folder-dialog.component.sass']
})
export class NewFolderDialogComponent {

  constructor(public dialogRef: MatDialogRef<NewFolderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialogData) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
