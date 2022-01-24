import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from './api-call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public items$: Observable<Array<itemDto>>;
  public start: number = 0;
  public end: number = 25;
  public readonly itemsToShow: number = 25;
  public itemsLength: number = 0;
  public numberToShow: any;
  public array: number[]=[];
  public newItemsList: item[] = [];
  public itemToPresent: item | undefined;
  public itemsDtoList:any [] = [];
  constructor(private service: ApiCallService) {
    this.items$ = this.service.getPosts();
    this.items$.subscribe(res => {
      this.itemsLength = res.length;
      this.numberToShow = this.itemsLength / this.end;
      this.itemsDtoList = res;
      this.array = [...Array(this.numberToShow).keys()]
      this.newItemsList =JSON.parse(localStorage["newItemsList"]).length?  JSON.parse(localStorage["newItemsList"]) : this.convertToModel(this.itemsDtoList) ;
      console.log(this.numberToShow);
    })
  }
  ngOnInit(): void {
     
  }

  setContent(i: number) {
    this.start = i * this.itemsToShow;
    this.end = this.start + this.itemsToShow;
  }

  convertToModel(items: itemDto[]):item[] {
    return items
      .map(v => ({ ...v, important: false }))
  }

  setChecked(i: number):void {
    console.log(this.newItemsList.find(item=> item.id === i));
    // this.newItemsList[i - 1].important = this.newItemsList[i - 1].important ? false : true;
    // this.newItemsList.find(item=> item.id === i).important  =  this.newItemsList.find(item=> item.id === i)?.important ? false : true;
    let itemIndex = this.newItemsList.findIndex(item=> item.id === i );
    this.newItemsList[itemIndex - 1].important = this.newItemsList[itemIndex - 1].important ? false : true;
    localStorage.setItem("newItemsList",  JSON.stringify(this.newItemsList));
  }

  showItem(itemToPresent: item):void {
    this.itemToPresent = itemToPresent;
  }

  sortByTitle() {
    this.newItemsList.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    })
  }
}

interface itemDto {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}


interface item {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  important: boolean
}