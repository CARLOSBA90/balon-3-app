import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

/**
 *  Checks if string is number and returned casted value
 * @param string
 * @returns integer parse number
 */
  parseToInt(string:string) {
    try {
      const intValue = parseInt(string);

      if (!isNaN(intValue)) {
        return intValue;
      }
    } catch (error) { console.error(error) }


    return 0;
  }

}
