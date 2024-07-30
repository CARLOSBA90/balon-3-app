import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardData } from '../../core/data/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private isFetching = false;
  url:string = 'https://cepr0.com/balon3/backend/';

  constructor(private http: HttpClient) {}


  /**
   * Retrieves general data of CardComponent
   * @returns promise of request data is returned
   */
    getData(request: { id: number; }): Promise<CardData> {
       return this.fetchData(request);
    }


  /**
   * HomeData
   * @returns GET request from API (homeData)
   */
  fetchData(request: { id: number; }): Promise<CardData> {

    const url = `${this.url}v1/cards/g/${request.id}`;

    return new Promise((resolve, reject) => {
      this.http.get<CardData>(url).subscribe({
        next:(response: CardData) =>{
            resolve(response);
        },
        error:(error: any) => {
          console.log("Error fetching card data: ", error);
          reject(error);
        },
        complete:()=> {
          this.isFetching = false;
        }
      });
    });
  }

}
