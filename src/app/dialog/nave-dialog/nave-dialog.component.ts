import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NaveModel } from 'src/app/models/NaveModel';


@Component({
  selector: 'app-nave-dialog',
  templateUrl: './nave-dialog.component.html',
  styleUrls: ['./nave-dialog.component.css']
})
export class NaveDialogComponent implements OnInit {
  nave!: NaveModel;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: NaveModel,
    public dialogRef: MatDialogRef<NaveDialogComponent>,
  ) { }

  ngOnInit(): void {
    if (this.data.naveId !== null) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
