import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { HomeData, RequestHomeData } from '../../core/data/home';
import { Card } from '../../core/models/card.model';
import { Pagination } from '../../core/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  data: HomeData| null = null;
  private isFetching = false;

  constructor(private http: HttpClient) {}

  /*********
   *
   *
   * CAMBIA PETICION A GET Y USAR ENCABEZADOS EN EL HEADERS!!!
   *
   *
   */

    /**
   * HomeData
   * @returns POST request from API (homeData)
   */
    private fetchDataPost(request:any): Promise<HomeData> {
      return new Promise((resolve, reject) => {

        const data: RequestHomeData = {
          page: request.page
        };

        const headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });


        this.http.post<HomeData>('assets/mocks/home.json', data, { headers }).subscribe({
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
   * HomeData
   * @returns GET request from API (homeData)
   */
  private fetchData(request:any): Promise<HomeData> {

   // const url = `assets/mocks/home.json?page=${request.page}`; // Construct URL

   const url = `http://localhost:3000/api/v1/cards/page/${request.page}`;


    return new Promise((resolve, reject) => {
      this.http.get<HomeData>(url).subscribe({
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
          return this.fetchData(null);
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
  async getHomeData(request:any): Promise<[Card[], Pagination]> {
    try {
      const data = await this.fetchData(request);
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
      /**T0D0 (V2): LOGIC TO HANDLE WIDE RANGE OF PAGES.. FOR EG: 1 - 2 - 3 - .... 30 - 31 - 32 */
    const pageNumbers = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pageNumbers.push(i.toString());
    }
    return pageNumbers;
  }

}
