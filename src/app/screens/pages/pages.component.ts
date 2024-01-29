import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  active = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate(val: string) {
    switch (val) {
      case 'home':
        this.router.navigateByUrl('pages/product-list');
        this.active = false;
        break;
      case 'about':
        this.router.navigateByUrl('pages/about');
        this.active = true;
        break;
      default:
        break;
    }
  }
}
