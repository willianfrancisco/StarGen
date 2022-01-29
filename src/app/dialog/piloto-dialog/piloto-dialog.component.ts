import { Component, OnInit } from '@angular/core';
import {Inject, } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PilotoModel } from 'src/app/models/pilotoModel';


@Component({
  selector: 'app-piloto-dialog',
  templateUrl: './piloto-dialog.component.html',
  styleUrls: ['./piloto-dialog.component.css']
})

export class PilotoDialogComponent implements OnInit {
  piloto!: PilotoModel;
  isChange!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: PilotoModel,
    public dialogRef: MatDialogRef<PilotoDialogComponent>,
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    if(this.data.pilotoId !== null){
      this.isChange = true;
    }
    else{
      this.isChange = false;
    }
  }

}
