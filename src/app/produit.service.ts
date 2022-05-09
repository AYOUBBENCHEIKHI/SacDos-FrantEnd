import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Produit} from "./produit";

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private apiSeverUrl = environment.apiBaseUrl;
  constructor(private http:HttpClient) {}
  public getProduit():Observable<Produit[]>{
    return this.http.get<any>(`${this.apiSeverUrl}/produit/all`);
  }
  public addProduit(produit :Produit): Observable<Produit> {
    return this.http.post<Produit>(`${this.apiSeverUrl}/produit/add`, produit);
  }

  public updateProduit(produit :Produit): Observable<Produit> {
    return this.http.put<Produit>(`${this.apiSeverUrl}/produit/update`, produit);
  }
  public solutionProduit(poidMax :number ):Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiSeverUrl}/produit/solution/${poidMax}`);
  }

}
