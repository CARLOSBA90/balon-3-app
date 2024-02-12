import { Card } from "../models/card.model";

export interface HomeData {
  date: string;
  limit: number;
  total: number;
  pages: number;
  actualPage: number;
  cards: Card[];
}
