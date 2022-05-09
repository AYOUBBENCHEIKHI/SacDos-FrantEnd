import {Component, OnInit} from '@angular/core';
import {Produit} from "./produit";
import {ProduitService} from "./produit.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public produits:Produit[]| undefined;
  public editProduit:Produit| undefined;



  constructor(private produitService:ProduitService) {
  }
  ngOnInit() {
    this.getProduit();
  }
  public getProduit(): void {
    this.produitService.getProduit().subscribe(
      (response: Produit[]) => {
        this.produits = response;
        console.log(this.produits);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public searchProduit(key: string): void {
    console.log(key);
    const results: Produit[] = [];
    // @ts-ignore
    for (const produit of this.produits) {
      if (produit.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(produit);
      }
    }
    this.produits = results;
    if (results.length === 0 || !key) {
      this.getProduit();
    }
  }
  public onAddProduit(addForm: NgForm): void {
    // @ts-ignore
    document.getElementById("add-produit-form").click();
    this.produitService.addProduit(addForm.value).subscribe(
      (response: Produit) => {
        console.log(response);
        this.getProduit();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
public solutionProduit(poidMax:number):void{
    if(poidMax == null){
      this.getProduit();
    }
    else {
      this.produitService.solutionProduit(poidMax).subscribe(
        (response: Produit[]) => {
          this.produits = response;
          console.log(this.produits);
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }

}
  public onUpdateProduit(produit: Produit): void {
    this.produitService.updateProduit(produit).subscribe(
      (response: Produit) => {
        console.log(response);
        this.getProduit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onOpenModal1( mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addProduitModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
  public onOpenModal(produit: Produit, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editProduit = produit;
      button.setAttribute('data-target', '#updateProduitModal');
    }
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }
}
