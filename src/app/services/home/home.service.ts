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
          return this.generatePagination(data);
      });
    } else {
       return Promise.resolve(this.generatePagination(null));
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
      const paginationInfo: Pagination = this.generatePagination(data);

      return [cards, paginationInfo];
    } catch (error) {
      console.error("Error fetching and preparing data:", error);
      throw error;
    }
  }

   /**
   * Generate data object of pagination from request
   * @returns object containing information for Paginator Component
   */
  generatePagination(data:any):Pagination{

    if(data)  this.data = data;

      return {
        date: this.data?.date || '',
        limit: this.data?.limit || 0,
        total: this.data?.total || 0,
        pages: this.data?.pages || 0,
        actualPage: this.data?.actualPage || 1,
        pageNumbers: this.generatePageNumbers(this.data?.pages || 0)
      };

    }


  generatePageNumbers(pagesNumber: number): string[] {
      /**T0D0: LOGIC TO HANDLE WIDE RANGE OF PAGES.. FOR EG: 1 - 2 - 3 - .... 30 - 31 - 32 */
    const pageNumbers = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pageNumbers.push(i.toString());
    }
    return pageNumbers;
  }

}
