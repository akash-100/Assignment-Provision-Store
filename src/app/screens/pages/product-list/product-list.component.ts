import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common/config/api.service';
import { DataService } from 'src/app/common/services/data.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  searchedValue = '';
  productRAWData: any = [];
  productData: any;
  ratings = [
    1, 2, 3, 4, 5
  ];
  favorites = [true, false];
  offer = [true, false];
  price = [70, 98, 100, 360, 25, 56, 87, 64, 190, 70, 98, 100, 360, 25, 56, 87, 64, 190]
  constructor(
    public data: DataService,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    // ************ commented, bcz , token service not working for me !!!!!!
    // if (this.data.token !== '') { 
    this.getData();
    // }
    // else {
    //   setTimeout(() => {
    //     this.init();
    //   }, 300);
    // }
  }

  getData() {
    this.apiService.getProductList().subscribe((success: any) => {
      const successData = success.response;
      this.productData = successData.map((object: any) => {
        return {
          ...object,
          fav: Math.floor(Math.random() * this.favorites.length),
          ratings: Math.floor(Math.random() * this.ratings.length),
          offer: Math.floor(Math.random() * this.offer.length),
          price: Math.floor(Math.random() * 25 * (this.price.length))
        };
      });
      this.productRAWData = JSON.parse(JSON.stringify(this.productData));
    });
  }

  getRData(val: number) {
    return new Array(val);
  }

  getNRData(val: number) {
    return new Array(5 - val);
  }

  getOriginalRate(price: number) {
    return +price - (+price * + 10 / 100)
  }

  getsearchedList() {
    const rawData = JSON.parse(JSON.stringify(this.productRAWData));
    const filteredData = rawData.filter((x: any) => (x.productCategory.productCategoryName.includes(this.searchedValue)));
    this.productData = filteredData;
  }

  doClear() {
    this.searchedValue = '';
    this.productData = JSON.parse(JSON.stringify(this.productRAWData));
  }

}
