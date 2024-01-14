import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../model/compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost/proyecto/ServicePurchase.svc/';

  constructor(private http: HttpClient) { }

  loadPurchases(): Observable<any> {
    let uri = this.apiUrl + "FindAllPurchases"
    return this.http.get(uri);
  }

  loadPurchase(purchaseId: number): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(purchaseId)}`;
    return this.http.get(url);
  }

  addPurchase(purchase: Purchase): Observable<any> {
    let uri = this.apiUrl + "AddPurchase"
    console.log(purchase)
    return this.http.post(uri, purchase);
  }

  updatePurchase(purchase: Purchase): Observable<any> {
    let uri = this.apiUrl + "EditPurchase"
    console.log(purchase)
    return this.http.put(uri, purchase);
  }

  async deletePurchase(purchaseId: number): Promise<void> {
    try {
      let uri = this.apiUrl + "DeletePurchase/"+purchaseId
      console.log(uri)

      await this.http.delete(uri).toPromise();
    } catch (error) {
      throw error;
    }
  }
}
