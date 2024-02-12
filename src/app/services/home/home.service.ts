import { Injectable } from '@angular/core';
import { HomeData } from '../../core/data/home';
import { HttpClient } from '@angular/common/http';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data: HomeData| null = null;
  private isFetching = false;

  constructor(private http: HttpClient) {}


  /**
   * HomeData
   * @returns request from API (homeData)
   */
  private fetchData(): Promise<HomeData> {
    return new Promise((resolve, reject) => {
      this.http.get<HomeData>('assets/mocks/home.json').subscribe({
        next:(response: HomeData) =>{
            this.data = response;
            resolve(response);
        },
        error:(error: any) => {
          console.log("Error fetching home data: ", error);
          reject(error);
        },
        complete:()=> {
          this.isFetching = false;
        }
    });
    });
  }

    /**
   * Retrieves general data of HomeComponent
   * @returns promise of request data is returned
   */
    getData(): Promise<HomeData> {
      if (!this.data && !this.isFetching) {
          this.isFetching = true;
          return this.fetchData();
        } else {
          return Promise.resolve(this.data as HomeData);
        }
    }


  /**
   * Retrieves cards
   * @returns promise that resolves with an array of `Card` objects.
   */
  async getCards(): Promise<Card[]> {
    if (!this.data) {
      return this.getData().then(data => data.cards as Card[]);
    } else {
      return Promise.resolve(this.data.cards as Card[]);
    }
  }

   /**
   * Retrieves pagination information from the cached home data
   * @returns promise that resolves with pagination variables.
   */
   async getPaginationData(): Promise<Pagination> {
    if (!this.data) {
      return this.getData().then(data => {
        const paginationInfo: Pagination = {
          date: data.date,
          limit: data.limit,
          total: data.total,
          pages: Math.ceil(data.total / data.limit),
          actualPage: data.actualPage || 1, // Default to page 1 if not provided
        };
        return paginationInfo;
      });
    } else {
      const paginationInfo: Pagination = {
        date: this.data.date,
        limit: this.data.limit,
        total: this.data.total,
        pages: Math.ceil(this.data.total / this.data.limit),
        actualPage: this.data.actualPage || 1,
      };
      return Promise.resolve(paginationInfo);
    }
  }

    /**
   * Retrieves pagination information and cards data from request
   * @returns promise that resolves with data
   */
  async getHomeData(): Promise<[Card[], Pagination]> {
    try {
      const data = await this.fetchData();
      const cards = data.cards as Card[];
      const paginationInfo: Pagination = {
        date: data.date,
        limit: data.limit,
        total: data.total,
        pages: Math.ceil(data.total / data.limit),
        actualPage: data.actualPage || 1, // Default to page 1 if not provided
      };
      return [cards, paginationInfo];
    } catch (error) {
      console.error("Error fetching and preparing data:", error);
      throw error;
    }
  }

}
