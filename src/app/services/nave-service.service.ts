import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH_NAVE } from 'src/environments/environment';
import { NaveModel } from '../models/NaveModel';

@Injectable({
  providedIn: 'root'
})
export class NaveServiceService {
  constructor(private http: HttpClient) { }

  obterNaves(): Observable<NaveModel[]>{
    return this.http.get<NaveModel[]>(`${API_PATH_NAVE}`);
  }

  criarNave(nave: NaveModel): Observable<NaveModel>{
    return this.http.post<NaveModel>(`${API_PATH_NAVE}`, nave);
  }

  editarNave(nave: NaveModel, id: number): Observable<NaveModel>{
    return this.http.put<NaveModel>(`${API_PATH_NAVE}/${id}`, nave);
  }

  deletarNave(idNave: number): Observable<unknown>{
      return this.http.delete(`${API_PATH_NAVE}/${idNave}`);
  }
}
