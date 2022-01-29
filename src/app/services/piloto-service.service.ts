import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH_PILOTO } from 'src/environments/environment';
import { PilotoModel } from '../models/pilotoModel';

@Injectable({
  providedIn: 'root'
})
export class PilotoServiceService {

  constructor(private http: HttpClient) { }

  obterPilotos(): Observable<PilotoModel[]>{
    return this.http.get<PilotoModel[]>(`${API_PATH_PILOTO}`);
  }

  criarPiloto(piloto: PilotoModel): Observable<PilotoModel>{
    return this.http.post<PilotoModel>(`${API_PATH_PILOTO}`, piloto);
  }

  editarPiloto(id: number, piloto: PilotoModel): Observable<PilotoModel>{
    return this.http.put<PilotoModel>(`${API_PATH_PILOTO}/${id}`, piloto);
  }

  deletarNave(id: number):Observable<unknown>{
    return this.http.delete(`${API_PATH_PILOTO}/${id}`);
  }
}
