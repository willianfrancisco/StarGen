import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaveComponent } from './crud/nave/nave.component';
import { PilotoComponent } from './crud/piloto/piloto.component';
import { HomeComponent } from './home/home/home.component';
import { ContatoComponent } from './views/contato/contato.component';
import { SobreComponent } from './views/sobre/sobre.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'contato', component:ContatoComponent},
  {path:'sobre', component:SobreComponent},
  {path:'naves',component:NaveComponent},
  {path:'pilotos',component:PilotoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
