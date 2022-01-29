import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { PilotoDialogComponent } from 'src/app/dialog/piloto-dialog/piloto-dialog.component';
import { PilotoModel } from 'src/app/models/pilotoModel';
import { PilotoServiceService } from 'src/app/services/piloto-service.service';


// const ELEMENT_DATA: PilotoModel[] = [
//   { pilotoId: 1, nome: 'Han Solo', idade: 20, planetaNatal: 'Tatooine' },
//   { pilotoId: 2, nome: 'Luke', idade: 19, planetaNatal: 'Tatooine' },
//   { pilotoId: 3, nome: 'Star Killer', idade: 19, planetaNatal: 'Tatooine' },
//   { pilotoId: 4, nome: 'Leia', idade: 25, planetaNatal: 'Coruscant' },
//   { pilotoId: 5, nome: 'Obi-wan', idade: 35, planetaNatal: 'Tatooine' },
// ];


@Component({
  selector: 'app-piloto',
  templateUrl: './piloto.component.html',
  styleUrls: ['./piloto.component.css']
})
export class PilotoComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['pilotoId', 'nome', 'idade', 'planetaNatal', 'action'];
  dataSource!: PilotoModel[];

  constructor(public dialog: MatDialog, private pilotoService: PilotoServiceService) {
    this.pilotoService.obterPilotos().subscribe((data: PilotoModel[]) => { this.dataSource = data });
  }

  ngOnInit(): void {
  }

  openDialog(element: PilotoModel | null): void {
    const dialogRef = this.dialog.open(PilotoDialogComponent, {
      width: '300px',
      data: element === null ? {
        pilotoId: null,
        nome: '',
        idade: null,
        planetaNatal: ''
      } : {
        pilotoId: element.pilotoId,
        nome: element.nome,
        idade: element.idade,
        planetaNatal: element.planetaNatal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.dataSource.map(p => p.pilotoId).includes(result.pilotoId)) {
          this.pilotoService.editarPiloto(result.pilotoId, result).subscribe((data: PilotoModel) => {
            const index = this.dataSource.findIndex(p => p.pilotoId === result.pilotoId);
            this.dataSource[index] = data;
            this.table.renderRows();
          });
        } else {
          this.pilotoService.criarPiloto(result).subscribe((data: PilotoModel) => {
            this.dataSource.push(data);
            this.table.renderRows();
          });
        }
      }
    });
  }

  deletePiloto(id: number): void {
    this.pilotoService.deletarNave(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.pilotoId !== id);
      this.table.renderRows();
    });
  }

  editPiloto(element: PilotoModel): void {
    this.openDialog(element);
    this.table.renderRows();
  }
}
