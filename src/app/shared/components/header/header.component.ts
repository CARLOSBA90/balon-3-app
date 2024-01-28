import { Component } from '@angular/core';
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
