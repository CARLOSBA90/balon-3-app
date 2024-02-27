import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../services/general/utils.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  constructor( private router: Router,
              private activedRoute: ActivatedRoute,
              private utils: UtilsService) {}

  onCardClick(id:number){
    this.router.navigate(['/c',id]);
  }
}
