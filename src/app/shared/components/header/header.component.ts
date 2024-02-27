import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router,
              private activedRoute: ActivatedRoute) {}


  home() {
    this.router.navigate(['/']);
  }

  ngOnInit() {}

}
