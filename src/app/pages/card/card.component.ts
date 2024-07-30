import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/general/utils.service';
import { CardService } from '../../services/card/card.service';
import { Card } from '../../core/models/card.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule,SpinnerComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('smoothChange', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class CardComponent {

  card: Card | undefined;
  gallery: Card[] = [];
  safeContent?: SafeHtml;
  inRequest: boolean = false;

  constructor( private router: Router,
              private activedRoute: ActivatedRoute,
              private utils: UtilsService,
              private service: CardService,
              private sanitizer: DomSanitizer) {}


  ngOnInit() {
    this.getParams();
  }

  getParams(){
    let id = this.utils.parseToInt(this.activedRoute.snapshot.paramMap.get('id')??'');
    this.getData(id);
  }

  async getData(id:number){
    this.inRequest = true;
    try {
      const data = await this.service.getData({id:id});
      this.inRequest = false;
      this.card = data.card;
      this.gallery = data.gallery;
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.card.content);
    } catch (error) {
      this.inRequest = false;
      console.error("Error fetching data in Card Component: ",error);
    }

  }

  onCardClick(id:number){
    this.getData(id);
    this.router.navigate(['/c',id]);
  }
}
