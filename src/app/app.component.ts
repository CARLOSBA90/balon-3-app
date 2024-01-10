import { Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query } from '@angular/animations';



import { Collapse } from 'flowbite';
import type { CollapseOptions, CollapseInterface } from 'flowbite';
import type { InstanceOptions } from 'flowbite';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('listAnimations', [
      transition(':enter', [
        query('a.card-football', [  // Target only a elements with class card-football
          style({ opacity: 0, transform: 'translateY(-5px)' }),
          animate('1s ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ])
    ])
  ]
})
export class AppComponent {

  constructor() {}

  ngOnInit() { /*this.collapse.expand();*/}
  // set the target element that will be collapsed or expanded (eg. navbar menu)
 $targetEl: HTMLElement | null = document.getElementById('navbar');

// optionally set a trigger element (eg. a button, hamburger icon)
 $triggerEl: HTMLElement | null = document.getElementById('btn-navbar');

// optional options with default values and callback functions
 options: CollapseOptions = {
    onCollapse: () => {
        console.log('element has been collapsed');
    },
    onExpand: () => {
        console.log('element has been expanded');
    },
    onToggle: () => {
        console.log('element has been toggled');
    },
};

// instance options object
 instanceOptions: InstanceOptions = {
  id: 'navbar',
  override: true
};

/*
 * $targetEl: required
 * $triggerEl: optional
 * options: optional
 * instanceOptions: optional
 */
 collapse: CollapseInterface = new Collapse(
    this.$targetEl,
    this.$triggerEl,
    this.options,
    this.instanceOptions
);

// show the target element




}




