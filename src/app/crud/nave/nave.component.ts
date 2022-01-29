import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { NaveDialogComponent } from 'src/app/dialog/nave-dialog/nave-dialog.component';
import { NaveModel } from 'src/app/models/NaveModel';
import { NaveServiceService } from 'src/app/services/nave-service.service';

@Component({
  selector: 'app-nave',
  templateUrl: './nave.component.html',
  styleUrls: ['./nave.component.css'],
})
export class NaveComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['naveId', 'nome', 'quantidadePassageiros', 'action'];
  dataSource!: NaveModel[];

  constructor(public dialog: MatDialog, private naveService: NaveServiceService) {
    this.naveService.obterNaves().subscribe((data: NaveModel[]) => this.dataSource = data);
  }

  ngOnInit(): void {
  }

  openDialog(element: NaveModel | null): void {
    const dialogRef = this.dialog.open(NaveDialogComponent, {
      width: '300px',
      data: element === null ? {
        naveId: null,
        nome: '',
        quantidadePassageiros: null,
      } : {
        naveId: element.naveId,
        nome: element.nome,
        quantidadeDePassageiros: element.quantidadeDePassageiros
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.naveId).includes(result.naveId)) {
            this.naveService.editarNave(result, result.naveId).subscribe((data: NaveModel) => {
            const index = this.dataSource.findIndex(p => p.naveId === data.naveId);
            this.dataSource[index] = data;
            this.table.renderRows();
          })
        } else {
          this.naveService.criarNave(result).subscribe((data: NaveModel) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  deletarNave(id: number): void {
    this.naveService.deletarNave(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.naveId !== id);
      this.table.renderRows();
    });
  }

  editarNave(nave: NaveModel): void {
    this.openDialog(nave);
    this.table.renderRows();
  }

}

