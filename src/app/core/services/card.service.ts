import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cards: Card[] = [];
  private isFetching = false;

  constructor(private http: HttpClient) {}

  getCards(): Promise<Card[]> {
    if (this.cards.length === 0 && !this.isFetching) {
        this.isFetching = true;
        return this.fetchCards();
      } else {
        return Promise.resolve(this.cards);
      }
  }


  private fetchCards(): Promise<Card[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Card[]>('assets/mocks/cards.json').subscribe({
        next:(cards: Card[]) =>{
            this.cards = cards;
            resolve(cards);
        },
        error:(error: any) => {
          console.log("Error fetching data CARDS: ", error);
          reject(error);
        },
        complete:()=> {
          this.isFetching = false;
        }
    });
    });
  }

}
