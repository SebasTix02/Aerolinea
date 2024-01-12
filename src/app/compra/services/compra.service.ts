import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../model/compra.model';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = 'http://localhost:3000/api/compras';

  constructor(private http: HttpClient) { }

  loadPurchases(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  loadPurchase(purchaseId: number): Observable<any> {
    const url = `${this.apiUrl}/${encodeURIComponent(purchaseId)}`;
    return this.http.get(url);
  }

  addPurchase(purchase: Purchase): Observable<any> {
    return this.http.post(this.apiUrl, purchase);
  }

  updatePurchase(purchaseData: { id: number, purchase: Purchase }): Observable<any> {
    const purchaseUrl = `${this.apiUrl}/${purchaseData.id}`;
    return this.http.put(purchaseUrl, purchaseData.purchase);
  }

  async deletePurchase(purchaseId: number): Promise<void> {
    try {
      // Verificar si hay registros relacionados antes de eliminar
      const hasRelatedRecords = await this.checkForRelatedRecords(purchaseId);

      // Si hay registros relacionados, lanzar un error
      if (hasRelatedRecords) {
        throw new Error('No se puede eliminar porque tiene registros enlazados.');
      }
      
      const purchaseUrl = `${this.apiUrl}/${purchaseId}`;
      await this.http.delete(purchaseUrl).toPromise();
    } catch (error) {
      throw error;
    }
  }

  private async checkForRelatedRecords(purchaseId: number): Promise<boolean> {
    try {
      const response = await this.http.get<boolean>(`${this.apiUrl}/hasRelatedRecords/${purchaseId}`).toPromise();
      return response || false;  // Si response es undefined, asigna false
    } catch (error) {
      throw error;
    }
  }
}
