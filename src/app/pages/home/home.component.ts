import { Component } from '@angular/core';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { Card } from '../../core/models/card.model';
import { CardService } from '../../core/services/card.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    animations: [
        trigger('listAnimations', [
            transition(':enter', [
                query('a.card-football', [
                    style({ opacity: 0, transform: 'translateY(-5px)' }),
                    animate('1s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
                ])
            ])
        ])
    ],
    imports: [HeaderComponent, FooterComponent]
})
export class HomeComponent {
  cardsData: Card[] = [];
  constructor(private cardService: CardService) {}

  ngOnInit() {
    this.getCards();
  }


  async getCards(){
    try {
      this.cardsData = await this.cardService.getCards();
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  }

}
