import { Fixture } from "./fixture.model";

export interface Card {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  fixture: Fixture;
}
